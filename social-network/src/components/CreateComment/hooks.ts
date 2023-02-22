import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { createComment, getPost } from '../../api'
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

  // usePolling(fetchComments, 10000)

  const [allComments, setAllComments] = useState([])

  const sortedComments = allComments.sort((a, b) =>
    sortNews(a.createAt, b.createAt),
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

  const fetchComments = async () => {
    const { data } = await getPost(postId)
    setData(data?.post.comments || [])
  }

  useEffect(() => {
    fetchComments()

    setIsLoading(false)
  }, [postId])

  return {
    data,
    isLoading,
  }
}
