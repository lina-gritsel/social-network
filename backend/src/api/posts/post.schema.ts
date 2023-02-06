import { z } from "zod"

export const createPostSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: "",
    }),
  }),
})

export type CreatePost = z.TypeOf<typeof createPostSchema>
