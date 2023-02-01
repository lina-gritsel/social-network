import { useState, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './helpers'

export interface FormValues {
  email: string
  name: string
  password: string
  date: string
  gender: string
}

export const useRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      date: '',
      gender: '',
    },
  })

  const onSubmit = (data) => console.log(data)

  const [showPassword, setShowPassword] = useState(false)

  const onChangeShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return {
    errors,
    control,
    showPassword,
    onSubmit,
    handleSubmit,
    onChangeShowPassword,
    handleMouseDownPassword,
  }
}
