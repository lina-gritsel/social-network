import { useEffect, useState } from 'react'

import { getPost, changeLike } from '../../api'
import { getRandomElemArr } from '../../utils'

const NUMBER_OF_AVATARS = 3

interface UseChangeLikeProps {
  postId: string
}
interface IDataLikes {
  userId: string
  avatar: string
}

export const useChangeLike = ({ postId }: UseChangeLikeProps) => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const [amountMoreLikes, setAmountMoreLikes] = useState<number>()
  const [dataLikes, setDataLikes] = useState<IDataLikes[]>([])
  const [avatarArr, setAvatarArr] = useState<IDataLikes[]>([])

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
      const maxInt = dataLikes?.length - 1
      const randomIndexArr = getRandomElemArr(NUMBER_OF_AVATARS, maxInt)
      const randomLikeUsers = randomIndexArr.map((index) => dataLikes[index])
      setAvatarArr(randomLikeUsers)
      setAmountMoreLikes(dataLikes.length - NUMBER_OF_AVATARS)
    } else {
      setAvatarArr(dataLikes)
      setAmountMoreLikes(null)
    }
    const isLike =
      dataLikes.filter(({ userId }) => userId === currentUserId).length === 1
    setIsLike(isLike)
  }, [dataLikes, currentUserId])

  const likeOnclick = async () => {
    const post = (await changeLike(postId, currentUserId)).data.post
    setDataLikes(post.likes)
  }

  return {
    isLike,
    avatarArr,
    amountMoreLikes,
    likeOnclick,
  }
}
