import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginUser } from '../../../api'
import { PATHS } from '../../../router/paths'

import { schema } from './helpers'

export interface FormValues {
  name: string
  password: string
}

export const useLoginForm = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoginError, setIsLoginError] = useState<boolean>(false)
  const [isUserExist, setIsUserExist] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (data) => {
    const { status, id } = await loginUser(data)

    if (status === 200) {
      localStorage.setItem('userId', JSON.stringify(id))
      navigate(PATHS.FEED)
    }

    if (status === 400) {
      setIsLoginError(true)
      setErrorMessage('Change your name or enter the correct password')
      return
    }

    if (status === 404) {
      setIsUserExist(false)
      setErrorMessage('User does not exists')
      return
    }
  }

  const changeErrorMessage = (isLoginErr, isUserExist) => {
    if (isLoginErr) {
      return errorMessage
    }

    if (!isUserExist) {
      return errorMessage
    }

    return errorMessage
  }

  const onChangeShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return {
    errors,
    control,
    isUserExist,
    showPassword,
    isLoginError,
    onSubmit,
    handleSubmit,
    changeErrorMessage,
    onChangeShowPassword,
    handleMouseDownPassword,
  }
}
