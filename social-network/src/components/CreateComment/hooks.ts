import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { createComment, getPost } from '../../api'
import { sortNews } from '../../utils'

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

  const sortedComments = allComments.sort((currentComment, nextComment) =>
    sortNews(currentComment.createAt, nextComment.createAt),
  )

  useEffect(() => {
    if (!isLoading) {
      setAllComments(data)
    }
  }, [data, isLoading])

  const onChangeComment = (event) => {
    setComment(event.target.value)
  }
  const onEmojiSelect = (event) => {
    setComment(prev=> prev + event.native)
  }

  const onSubmit = async () => {
    const { comments } = await createComment({
      userId: userInfo?.id,
      comment,
      postId,
    })
    setAllComments(comments)
    setComment('')
    setSchowComments(true)
  }

  return {
    onSubmit,
    comment,
    onChangeComment,
    onEmojiSelect,
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
