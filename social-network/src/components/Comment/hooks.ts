import { ChangeComment, createComment } from '../../api'

export const addComment = async (comment: ChangeComment) => {
  const result = await createComment(comment)

  return result.comments.flat(Infinity)
}
