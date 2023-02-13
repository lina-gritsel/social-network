import moment from 'moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

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
  const userInfo = useSelector(getUserInfoSelector)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      date: userInfo?.date,
      gender: userInfo?.gender,
      bio: userInfo?.bio || '',
      location: userInfo?.location || '',
      facebook: userInfo?.facebook || '',
      twitter: userInfo?.twitter || '',
      instagramm: userInfo?.instagramm || '',
    },
  })

  useEffect(() => {
    reset({
      id: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      date: userInfo?.date,
      gender: userInfo?.gender,
      bio: userInfo?.bio || '',
      location: userInfo?.location || '',
      facebook: userInfo?.facebook || '',
      twitter: userInfo?.twitter || '',
      instagramm: userInfo?.instagramm || '',
    })
  }, [userInfo, reset])

  const onCancel = () => {
    reset({
      id: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      date: userInfo?.date,
      gender: userInfo?.gender,
      bio: userInfo?.bio || '',
      location: userInfo?.location || '',
      facebook: userInfo?.facebook || '',
      twitter: userInfo?.twitter || '',
      instagramm: userInfo?.instagramm || '',
    })
  }

  const onSubmit = async (data: User) => {
    setIsLoading(true)
    await updateUser({
      ...data,
      date: moment(data.date).unix(),
    })
    dispatch(fetchUser(data.id))
    setIsLoading(false)
  }

  return {
    errors,
    control,
    userInfo,
    isLoading,
    onCancel,
    onSubmit,
    handleSubmit,
  }
}
