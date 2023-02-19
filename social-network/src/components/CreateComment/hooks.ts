import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createComment, getPost } from '../../api'

import { getUserInfoSelector } from '../../store/selectors'

export const useCreateComment = (postId: string) => {
  const userInfo = useSelector(getUserInfoSelector)

  const { data, isLoading } = useFetchCertainsComments(postId)
  const [comment, setComment] = useState<string>('')

  const [allComments, setAllComments] = useState([])

  useEffect(() => {
    if (!isLoading) {
      setAllComments(data)
    }
  }, [data, isLoading])

  const onChangeComment = (event) => {
    setComment(event.target.value)
  }

  const onSubmit = async () => {
    const { comments } = await createComment({
      userId: userInfo?.id,
      comment,
      postId,
    })
    setAllComments(comments)
    setComment('')
  }

  return {
    onSubmit,
    comment,
    onChangeComment,
    allComments,
    isLoading,
  }
}

export const useFetchCertainsComments = (postId: string) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await getPost(postId)
      setData(data?.post.comments || [])
    }
    fetchComments()

    setIsLoading(false)
  }, [postId])

  return {
    data,
    isLoading,
  }
}
