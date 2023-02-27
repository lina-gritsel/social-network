import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser, User } from '../../api'
import { PATHS } from '../../router/paths'

export const useModalContent = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const inputRef = useRef<HTMLInputElement>()

  return {
    inputRef,
    isDisabled,
    setIsDisabled,
  }
}

export const parseUserData = (user) => {
  return {
    gender: user?.gender,
    birthday: moment.unix(user?.date).format('DD/MM/YYYY'),
    location: user?.location,
    facebook: user?.facebook,
    twitter: user?.twitter,
    instagram: user?.instagram,
    followers: user?.followers?.length || '-',
    followings: user?.followings?.length || '-',
  }
}

export const useFetchProfileInfo = (id: string) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    const fetchUserProfileInfo = async () => {
      setIsLoading(true)

      const { data, status } = await getUser(id)
      if (status === 'success') {
        setUser(data?.user)
      } else {
        navigate(PATHS.PAGE_404, { replace: true })
      }
      setIsLoading(false)
    }

    fetchUserProfileInfo()
  }, [id])

  return {
    user,
    isLoading,
  }
}

export const useWallpapersModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return {
    visible,
    close: () => setVisible(false),
    open: () => setVisible(true),
  }
}
