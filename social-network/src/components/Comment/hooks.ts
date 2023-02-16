import { createComment } from '../../api'

export const addComment = async (comment) => {
  const result = await createComment(comment)

  return result
}
