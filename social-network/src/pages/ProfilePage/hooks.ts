import moment from 'moment'
import { useSelector } from 'react-redux'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { getWallpapers, changeUser } from '../../api'
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
    setBgImage(userInfo?.background || DEFAULT_WALLPAPER)
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
  }, [userInfo?.background])

  useEffect(() => {
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

  const onLoadImg = async (e: SyntheticEvent) => {
    const newImg = (e.target as HTMLImageElement).src
    await changeUser(
      {
        background: newImg,
      },
      userInfo?.id,
    )
    console.log('Load!')
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
    onLoadImg,
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
