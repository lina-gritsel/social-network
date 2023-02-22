import moment from 'moment'
import { useSelector } from 'react-redux'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { getUser, getWallpapers, User } from '../../api'
import { getUserInfoSelector } from '../../store/selectors'

import { DEFAULT_WALLPAPER } from './constants'

export const useProfilePage = () => {
  const userInfo = useSelector(getUserInfoSelector)

  const profileInfoArr = [
    userInfo?.gender,
    moment.unix(userInfo?.date).format('DD/MM/YYYY'),
    userInfo?.location,
    userInfo?.facebook,
    userInfo?.twitter,
    userInfo?.instagram,
    userInfo?.followers,
    userInfo?.following,
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bgImageArr, setBgImageArr] = useState<string[]>([])
  const [bgImage, setBgImage] = useState<string>(DEFAULT_WALLPAPER)

  useEffect(() => {
    if ('bgImage' in localStorage) {
      setBgImage(JSON.parse(window.localStorage.getItem('bgImage')))
    }
    if ('bgImageArr' in localStorage) {
      setBgImageArr(JSON.parse(window.localStorage.getItem('bgImageArr')))
    } else {
      const setWallpapers = async () => {
        setIsLoading(true)
        const wallpapers = await getWallpapers()
        setBgImageArr(wallpapers)
        setIsLoading(false)
      }
      setWallpapers()
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('bgImage', JSON.stringify(bgImage))
    window.localStorage.setItem('bgImageArr', JSON.stringify(bgImageArr))
  }, [bgImage, bgImageArr])

  const errorImg = (e: SyntheticEvent) => {
    setBgImageArr((prev) => prev.slice(0, -1))
    setIsErrorImg(true)
    const img = e.target as HTMLImageElement
    img.onerror = null
    setBgImage(DEFAULT_WALLPAPER)
    img.src = bgImage
  }

  return {
    isOpen,
    isLoading,
    bgImage,
    userInfo,
    bgImageArr,
    isErrorImg,
    profileInfoArr,
    errorImg,
    setIsOpen,
    setBgImage,
    setBgImageArr,
    setIsErrorImg,
  }
}

export const useModalContent = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const inputRef = useRef<HTMLInputElement>()

  return {
    inputRef,
    isDisabled,
    setIsDisabled,
  }
}

export const useFetchProfileInfo = (id: string) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      setIsLoading(true)

      const { data } = await getUser(id)
      setUser(data?.user)

      setIsLoading(false)
    }

    fetchUserProfileInfo()
  }, [id])

  const userProfileInfoArr = [
    user?.gender,
    moment.unix(user?.date).format('DD/MM/YYYY'),
    user?.location,
    user?.facebook,
    user?.twitter,
    user?.instagram,
    user?.followers,
    user?.following,
  ]

  return {
    user,
    isLoading,
    userProfileInfoArr,
  }
}
