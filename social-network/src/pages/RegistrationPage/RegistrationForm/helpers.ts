import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(8).required(),
  date: yup.date().required(),
  gender: yup.string().required(),
})
