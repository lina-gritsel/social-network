import moment from 'moment'
import { useSelector } from 'react-redux'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { getUserInfoSelector } from '../../store/selectors'

import { BG_IMAGES } from './constants'

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
  const [bgImageArr, setBgImageArr] = useState<string[]>(BG_IMAGES)
  const [bgImage, setBgImage] = useState<string>(bgImageArr[0])

  useEffect(() => {
    setBgImage(JSON.parse(window.localStorage.getItem('bgImage')))
    setBgImageArr(JSON.parse(window.localStorage.getItem('bgImageArr')))
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
    setBgImage(BG_IMAGES[0])
    img.src = bgImage
  }

  return {
    isOpen,
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
