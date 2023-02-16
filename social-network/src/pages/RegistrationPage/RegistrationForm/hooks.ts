import moment from 'moment'
import { useState, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { PATHS } from '../../../router/paths'
import { createUser } from '../../../api/requests'

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
      instagram: '',
      twitter: '',
      facebook: '',
    },
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isRegistrError, setIsRegistrError] = useState<boolean>(false)

  const onSubmit = async (data) => {
    const result = await createUser({
      ...data,
      date: moment(data.date).unix(),
    })

    if (result.status === 'success') {
      localStorage.setItem('userId', JSON.stringify(result.data.user.id))
      navigate(PATHS.NEWS)
    } else {
      setIsRegistrError(true)
    }
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
