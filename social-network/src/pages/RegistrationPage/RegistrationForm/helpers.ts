import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(20)
    .required('Email is a required field'),
  name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, 'Nickname must be a string')
    .min(2, 'Mininum 2 characters')
    .max(15, 'Maximum 15 characters')
    .required('This field is required'),
  password: yup
    .string()
    .min(8, 'Pasword must be 8 or more characters')
    .matches(/\d/, 'Password should contain at least one number')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      'Password should contain at least one uppercase and lowercase character',
    )
    .required('This field is required'),
  date: yup.date().required(),
})
