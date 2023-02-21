import { useEffect, useState } from 'react'

import { getPost, changeLike, getUser } from '../../api'
import { getRandomInt } from '../../utils'

const NUMBER_OF_AVATARS = 3

const getAvatarPromiseArr = (usersId: string[]) => {
  const promiseArr = usersId.map(async (userId) => {
    const user = await getUser(userId)
    const avatar = user.data.user?.avatar
    return avatar
  })
  return promiseArr
}

interface UseChangeLikeProps {
  postId: string
}

export const useChangeLike = ({ postId }: UseChangeLikeProps) => {
  const [isLike, setIsLike] = useState(false)
  const [amountMoreLikes, setAmountMoreLikes] = useState<number>()
  const [dataLikes, setDataLLikes] = useState([])
  const [avatarArr, setAvatarArr] = useState<string[]>([])

  const currentUserId =
    (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    const fetchLikes = async () => {
      const { data } = await getPost(postId)
      setDataLLikes(data?.post.likes || [])
    }
    fetchLikes()
  }, [postId])

  useEffect(() => {
    const getAvatarArr = async () => {
      let usersId: string[] = []

      if (dataLikes.length > NUMBER_OF_AVATARS) {
        usersId = dataLikes.slice(0, 3).map(({ userId }) => userId)
        setAmountMoreLikes(dataLikes.length - NUMBER_OF_AVATARS)
      } else {
        usersId = dataLikes.map(({ userId }) => userId)
        setAmountMoreLikes(null)
      }
      const avatarArr = await Promise.all(getAvatarPromiseArr(usersId))
      setAvatarArr(avatarArr)
    }
    getAvatarArr()

    const isLike =
      dataLikes.filter(({ userId }) => userId === currentUserId).length === 1
    setIsLike(isLike)
  }, [dataLikes, currentUserId])

  const likeOnclick = async () => {
    const post = (await changeLike(postId, currentUserId)).data.post
    setDataLLikes(post.likes)
  }

  return {
    isLike,
    likeOnclick,
    avatarArr,
    amountMoreLikes,
  }
}
