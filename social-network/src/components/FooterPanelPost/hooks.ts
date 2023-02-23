import { useEffect, useState } from 'react'

import { getPost, changeLike, getUser } from '../../api'
import { getRandomElemArr } from '../../utils'

const NUMBER_OF_AVATARS = 3

const getAvatarPromiseArr = (usersId: string[]) => {
  const promiseArr = usersId.map(async (userId) => {
    try {
      const user = await getUser(userId)
      const avatar = user.data.user?.avatar
      return avatar
    } catch {
      return ''
    }
  })
  return promiseArr
}

interface UseChangeLikeProps {
  postId: string
}
interface IDataLikes {
  userId: string
}

export const useChangeLike = ({ postId }: UseChangeLikeProps) => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [amountMoreLikes, setAmountMoreLikes] = useState<number>()
  const [dataLikes, setDataLikes] = useState<IDataLikes[]>([])
  const [avatarArr, setAvatarArr] = useState<string[]>([])
  const [likesUsersId, setLikesUsersId] = useState<string[]>([])

  const currentUserId =
    (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    const fetchLikes = async () => {
      const { data } = await getPost(postId)
      setDataLikes(data?.post.likes || [])
    }
    fetchLikes()
  }, [postId])

  useEffect(() => {
    if (dataLikes.length > NUMBER_OF_AVATARS) {
      const randomIndexArr = getRandomElemArr(NUMBER_OF_AVATARS)
      const randomLikeUsers = randomIndexArr.map((index) => dataLikes[index])
      setLikesUsersId(randomLikeUsers.map(({ userId }) => userId))
      setAmountMoreLikes(dataLikes.length - NUMBER_OF_AVATARS)
    } else {
      setLikesUsersId(dataLikes.map(({ userId }) => userId))
      setAmountMoreLikes(null)
    }
    const isLike =
      dataLikes.filter(({ userId }) => userId === currentUserId).length === 1
    setIsLike(isLike)

  }, [dataLikes, currentUserId])

  useEffect(() => {
    const getAvatarArr = async () => {
      setIsLoading(true)
      const avatarArr = await Promise.all(getAvatarPromiseArr(likesUsersId))
      setAvatarArr(avatarArr)
      setIsLoading(false)
    }
    getAvatarArr()
  }, [likesUsersId])

  const likeOnclick = async () => {
    const post = (await changeLike(postId, currentUserId)).data.post
    setDataLikes(post.likes)
  }

  return {
    isLike,
    isLoading,
    avatarArr,
    likesUsersId,
    amountMoreLikes,
    likeOnclick,
  }
}
