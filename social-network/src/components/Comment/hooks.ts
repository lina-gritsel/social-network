import { ChangeComment, createComment } from '../../api'

export const addComment = async (comment: ChangeComment) => {

    const result = await createComment(comment)
    console.log(result.comments)
    return result
}
