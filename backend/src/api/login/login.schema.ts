import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'User Name is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

export type Login = z.TypeOf<typeof loginSchema>
