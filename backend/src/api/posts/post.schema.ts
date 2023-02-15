import { z } from 'zod'

export const createPostSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: '',
    }),
    content: z.string({
      required_error: '',
    }),
    image: z.string(),
  }),
})

export const params = z.object({
  postId: z.string(),
})

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
})

export const updatePostSchema = z.object({
  params,
  body: z
    .object({
      content: z.string(),
      commentCreator: z.string(),
      comment: z.any(),
    })
    .partial(),
})

export const addCommentSchema = z.object({
  params,
  body: z
    .object({
      comments: z.object({
        userId: z.string(),
        comment: z.string(),
      }),
    })
    .partial(),
})

export const changeLikesSchema = z.object({
  params,
  body: z
    .object({
      likes: z.object({
        userId: z.string(),
        isLike: z.boolean(),
      }),
    })
    .partial(),
})

export type Params = z.TypeOf<typeof params>
export type CreatePost = z.TypeOf<typeof createPostSchema>
export type FilterQuery = z.TypeOf<typeof filterQuery>
export type UpdatePost = z.TypeOf<typeof updatePostSchema>
export type AddComment = z.TypeOf<typeof addCommentSchema>
export type ChangeLike = z.TypeOf<typeof changeLikesSchema>
