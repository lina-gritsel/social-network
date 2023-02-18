import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { getUser, createComment, getPost } from '../../api'

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
  const [commentsWithAllInfo, setCommentsWithAllInfo] = useState<any>([])

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await getPost(postId)
      setAllComments(data?.post.comments || [])
    }
    fetchComments()

    setIsLoading(false)
  }, [postId])

  const commentsWithUserInfo = async (comment) => {
    const userId = comment.userId
    const promises = []

    promises.push(getUser(userId))

    const infoCreaterPost = await Promise.all(promises)
    const infoAuthorComment = infoCreaterPost[0].data.user

    console.log({
      comment: comment.comment,
      name: infoAuthorComment.name,
      avatar: infoAuthorComment.avatar,
    })

    // setCommentsWithAllInfo((prev) => [
    //   ...prev,
    //   {
    //     comment: comment.comment,
    //     name: infoAuthorComment.name,
    //     avatar: infoAuthorComment.avatar,
    //   },
    // ])
  }
  // useEffect(() => {
  //   console.log(allComments)
  //   allComments.map((comment) => {
  //     commentsWithUserInfo(comment)
  //   })
  // }, [])

  return {
    allComments: commentsWithUserInfo,
    isLoading,
    setAllComments,
  }
}
