import { useEffect, useState } from 'react'
import { getPost, changeLike } from '../../api'

interface UseChangeLikeProps {
  postId: string
}

export const useChangeLike = ({ postId }: UseChangeLikeProps) => {
  const [isLike, setIsLike] = useState(false)
  const [amountLikes, setAmountLikes] = useState<number>()
  const [dataLikes, setDataLLikes] = useState([])

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
    setAmountLikes(dataLikes.length)
    const isLike =
      dataLikes.filter(({ userId }) => userId === currentUserId).length === 1
    setIsLike(isLike)
  }, [dataLikes, currentUserId])

  const likeOnclick = async () => {
    const post = (await changeLike(postId, currentUserId)).data.post
    setDataLLikes(post.likes)
    setAmountLikes(post.likes.length)
  }

  return {
    isLike,
    amountLikes,
    likeOnclick,
  }
}
