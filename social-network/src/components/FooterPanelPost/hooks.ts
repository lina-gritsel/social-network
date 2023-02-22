import { useEffect, useState } from 'react'

import { getPost, changeLike, getUser } from '../../api'
import { getRandomInt } from '../../utils'

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

const getRandomElemArr = () => {
  let randElem: number
  const newElements: number[] = []
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    randElem = getRandomInt(0, NUMBER_OF_AVATARS + 1)
    while (newElements.indexOf(randElem) !== -1) {
      randElem = getRandomInt(0, NUMBER_OF_AVATARS + 1)
    }
    newElements.push(randElem)
  }
  return newElements
}

interface UseChangeLikeProps {
  postId: string
}

export const useChangeLike = ({ postId }: UseChangeLikeProps) => {
  const [isLike, setIsLike] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [amountMoreLikes, setAmountMoreLikes] = useState<number>()
  const [dataLikes, setDataLLikes] = useState([])
  const [avatarArr, setAvatarArr] = useState<string[]>([])
  const [likesUsersId, setLikesUsersId] = useState<string[]>([])

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
    if (dataLikes.length > NUMBER_OF_AVATARS) {
      const randomIndexArr = getRandomElemArr()
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
    setDataLLikes(post.likes)
  }

  return {
    isLike,
    isLoading,
    likeOnclick,
    avatarArr,
    likesUsersId,
    amountMoreLikes,
  }
}
