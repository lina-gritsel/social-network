import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

import { updateUser, User } from '../../../api'
import { useAppDispatch } from '../../../store'
import { fetchUser } from '../../../store/actions'
import { getUserInfoSelector } from './../../../store/selectors/index'

import { schema } from './helpers'

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
  const dispatch = useAppDispatch()
  const {
    email,
    name,
    date,
    gender,
    id,
    bio,
    location,
    facebook,
    instagramm,
    twitter,
  } = useSelector(getUserInfoSelector)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: id,
      email: email,
      name: name,
      date: date,
      gender: gender,
      bio: bio || '',
      location: location || '',
      facebook: facebook || '',
      twitter: twitter || '',
      instagramm: instagramm || '',
    },
  })

  const onCancel = () => console.log('cancel')

  const onSubmit = async (data: User) => {
    await updateUser({
      ...data,
      date: moment(data.date).unix(),
    })
    dispatch(fetchUser(data.id))
  }

  return {
    errors,
    control,
    onCancel,
    onSubmit,
    handleSubmit,
  }
}
