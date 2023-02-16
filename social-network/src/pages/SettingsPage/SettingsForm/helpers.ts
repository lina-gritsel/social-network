import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  date: yup.date().required(),
  bio: yup.string(),
  location: yup.string(),
})
