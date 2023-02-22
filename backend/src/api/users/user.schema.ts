import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    date: z.number(),
  }),
})

export const params = z.object({
  userId: z.string(),
})

export const updateUserSchema = z.object({
  params,
  body: z
    .object({
      name: z.string(),
      email: z.string(),
      date: z.number(),
      location: z.string(),
      instagram: z.string(),
      twitter: z.string(),
      facebook: z.string(),
      bio: z.string(),
      background: z.string(),
      wallpapers: z.any(),
    })
    .partial(),
})

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(100),
})

export type ParamsInput = z.TypeOf<typeof params>
export type FilterQueryInput = z.TypeOf<typeof filterQuery>
export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body']
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>
