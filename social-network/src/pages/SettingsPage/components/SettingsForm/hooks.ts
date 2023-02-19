import moment from 'moment'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { updateUser } from '../../../../api'
import { useAppDispatch } from '../../../../store'
import { fetchUser } from '../../../../store/actions'
import { getUserInfoSelector } from '../../../../store/selectors/index'

import { schema } from './helpers'

export interface FormValues {
  id: string
  avatar: string
  email: string
  name: string
  date: string
  gender: string
  bio: string
  location: string
  facebook: string
  twitter: string
  instagram: string
}

export const useSettingsForm = () => {
  const dispatch = useAppDispatch()

  const userInfo = useSelector(getUserInfoSelector)
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')

  const {
    visible: visibleAvatarModal,
    open: openAvatarModal,
    close: closeAvatarModal,
  } = useAvatarModal()

  const inputRef = useRef<HTMLInputElement>()

  const handleClickAddBtn = (): void => {
    const newImg = inputRef.current.value.trim()
    setImg(newImg)
    closeAvatarModal()
  }

  const initialUserValues = {
    id: userInfo?.id,
    avatar: userInfo?.avatar || '',
    email: userInfo?.email,
    name: userInfo?.name,
    date: moment.unix(userInfo?.date).toDate(),
    gender: userInfo?.gender,
    bio: userInfo?.bio || '',
    location: userInfo?.location || '',
    facebook: userInfo?.facebook || '',
    twitter: userInfo?.twitter || '',
    instagram: userInfo?.instagram || '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialUserValues,
  })

  useEffect(() => {
    reset(initialUserValues)
  }, [userInfo, reset])

  const onCancel = (): void => {
    reset(initialUserValues)
    setImg(userInfo?.avatar || '')
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      await updateUser({
        ...data,
        date: moment(data.date).unix(),
      })
      dispatch(fetchUser(data.id))
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    img,
    errors,
    control,
    userInfo,
    inputRef,
    isLoading,
    visibleAvatarModal,
    open,
    onCancel,
    onSubmit,
    handleSubmit,
    openAvatarModal,
    closeAvatarModal,
    handleClickAddBtn,
  }
}

export const useAvatarModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return {
    visible,
    open: () => setVisible(true),
    close: () => setVisible(false),
  }
}
