import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createComment, getPost } from '../../api'

import { getUserInfoSelector } from '../../store/selectors'
import { sortNews } from '../../utils/utils'

interface UseCreateCommentProps {
  postId: string
  setSchowComments: (value: boolean) => void
}

export const useCreateComment = ({
  postId,
  setSchowComments,
}: UseCreateCommentProps) => {
  const userInfo = useSelector(getUserInfoSelector)

  const { data, isLoading } = useFetchCertainsComments(postId)
  const [comment, setComment] = useState<string>('')

  const [allComments, setAllComments] = useState([])

  const sortedComments = allComments.sort((a, b) =>
    sortNews(a.createdAt, b.createdAt),
  )

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
    setSchowComments(false)
    setAllComments(comments)
    setComment('')
  }

  return {
    onSubmit,
    comment,
    onChangeComment,
    allComments: sortedComments,
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