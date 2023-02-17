import { FC } from 'react'
import { ChangeComment, createComment, getUser } from '../../api'
import ExistComment from './ExistComment'

export const addComment = async (comment: ChangeComment) => {
  const result = await createComment(comment)

  return result.comments.flat(Infinity)
}

export const createListComments = (postComments) => {
  postComments.map(async (comment) => {
    const author = await getUser(comment.userId)

    return author.data.user
    console.log(author.data.user)
  })
}
