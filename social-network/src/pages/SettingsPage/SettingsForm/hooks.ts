import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './helpers'

export interface FormValues {
  email: string
  nickname: string
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      nickname: '',
      date: '',
      gender: 'male',
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
