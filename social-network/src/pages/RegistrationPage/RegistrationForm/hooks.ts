import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

import { createUser } from '../../../api/requests'
import { PATHS } from '../../../router/paths'

import { schema } from './helpers'

export interface FormValues {
  email: string
  name: string
  password: string
  date: string
  gender: string
}

export const useRegistrationForm = () => {
  const navigate = useNavigate()
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
      gender: 'male',
      instagramm: '',
      twitter: '',
      facebook: '',
    },
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isRegistrError, setIsRegistrError] = useState<boolean>(false)

  const onSubmit = async (data) => {
    const { success } = await createUser({
      ...data,
      date: moment(data.date).unix(),
    })

    // localStorage.setItem('userId', JSON.stringify(data.id))

    success ? navigate(PATHS.NEWS) : setIsRegistrError(true)
  }

  const onChangeShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return {
    errors,
    control,
    showPassword,
    isRegistrError,
    onSubmit,
    handleSubmit,
    onChangeShowPassword,
    handleMouseDownPassword,
  }
}
