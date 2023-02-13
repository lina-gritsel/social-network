import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { getUserInfoSelector } from './../../../store/selectors/index'

import { schema } from './helpers'
import { useEffect } from 'react'

export interface FormValues {
  email: string
  name: string
  date: string
  gender: string
  bio: string
  location: string
  language: string
  facebook: string
  twitter: string
  instagram: string
}

export const useSettingsForm = () => {
  const actualLanguage = localStorage.getItem('i18nextLng')
  const { email, name, date, gender } = useSelector(getUserInfoSelector)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: email,
      name: name,
      date: date,
      gender: gender,
      bio: '',
      location: '',
      language: actualLanguage,
      facebook: '',
      twitter: '',
      instagram: '',
    },
  })

  const onCancel = () => console.log('cancel')

  const onSubmit = (data) => console.log(data)

  return {
    errors,
    control,
    onCancel,
    onSubmit,
    handleSubmit,
  }
}
