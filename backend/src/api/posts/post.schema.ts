import { z } from 'zod'

export const createPostSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: '',
    }),
  }),
})

export const params = z.object({
    postId: z.number(),
})

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
})

export type Params = z.TypeOf<typeof params>
export type CreatePost = z.TypeOf<typeof createPostSchema>
export type FilterQuery = z.TypeOf<typeof filterQuery>
