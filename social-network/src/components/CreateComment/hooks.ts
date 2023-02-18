import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createComment, getPost } from '../../api'

import { getUserInfoSelector } from '../../store/selectors'

export const useCreateComment = (postId: string) => {
  const userInfo = useSelector(getUserInfoSelector)

  const { allComments, setAllComments, isLoading } =
    useFetchCertainsComments(postId)

  const [comment, setComment] = useState<string>('')

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
  }
}

export const useFetchCertainsComments = (postId: string) => {
  const [allComments, setAllComments] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await getPost(postId)
      setAllComments(data?.post.comments || [])
    }
    fetchComments()

    setIsLoading(false)
  }, [postId])

  return {
    allComments,
    isLoading,
    setAllComments,
  }
}
