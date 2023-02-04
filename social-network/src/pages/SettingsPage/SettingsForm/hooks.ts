import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './helpers'

export interface FormValues {
  email: string
  name: string
  date: string
  gender: string
  bio: string
  location: string
  language: string
}

export const useSettingsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      date: '',
      gender: 'male',
      bio: '',
      location: '',
      language: 'english',
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
