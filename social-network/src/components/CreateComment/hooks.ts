import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { getUser, createComment, getPost } from '../../api'

export const useCreateComment = (postId: string) => {
  const userInfo = useSelector(getUserInfoSelector)

  const { allComments, setAllComments, isLoading } =
    useFetchCertainsComments(postId)

  const [comment, setComment] = useState<string>('')
  const [authorsPosts, setAuthorsPosts] = useState([])

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
  console.log(allComments)

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await getPost(postId)
      setAllComments(data?.post.comments || [])
    }
    fetchComments()

    setIsLoading(false)
  }, [postId])

  const commentsWithUserInfo = allComments.map(async (comment) => {
    const userId = comment.userId

    const { data } = await getUser(userId)

    return {
      ...comment,
      avatar: data?.user?.avatar,
      name: data?.user?.name,
    }
  })

  return { allComments: commentsWithUserInfo, isLoading, setAllComments }
}
