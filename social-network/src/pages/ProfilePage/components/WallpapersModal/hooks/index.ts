import { SyntheticEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { changeUser, getWallpapers } from '../../../../../api'
import { getUserInfoSelector } from '../../../../../store/selectors'
import { DEFAULT_NUMBER_PICTURES, DEFAULT_WALLPAPER } from '../../../constants'
import { useModalContent } from '../../../hooks'

export const useWallpaperModal = () => {
  const userInfo = useSelector(getUserInfoSelector)

  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bgImageArr, setBgImageArr] = useState<string[]>([])
  const [bgImage, setBgImage] = useState<string>(
    userInfo?.background || DEFAULT_WALLPAPER,
  )

  const {isLoadin} = useFetchAllWallpapers({userInfo})

  const userWallpapers = userInfo?.wallpapers || []

  useEffect(() => {
    setBgImage(userInfo?.background || DEFAULT_WALLPAPER)

    const setWallpapers = async () => {
      setIsLoading(true)
      const wallpapers = await getWallpapers()
      setBgImageArr([...wallpapers, ...userWallpapers])
      setIsLoading(false)
    }
    setWallpapers()
  }, [userInfo])

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

    if (
      bgImageArr.indexOf(newImg) >= DEFAULT_NUMBER_PICTURES &&
      !userWallpapers.includes(newImg)
    ) {
      userWallpapers.push(newImg)
    }

    const params = {
      background: newImg,
      wallpapers: userWallpapers,
    }

    await changeUser({ ...params }, userInfo?.id)
  }

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
  const { inputRef, isDisabled, setIsDisabled } = useModalContent()

  const handleClickImg = (e: MouseEvent) => {
    setBgImage((e.target as HTMLImageElement).src)
    setIsErrorImg(false)
  }

  const handleClickBtn = () => {
    const newImg = inputRef.current.value.trim()
    setBgImage(newImg)
    setBgImageArr((prev) => (prev.includes(newImg) ? prev : [...prev, newImg]))
    inputRef.current.value = ''
  }

  const onChangeInput = () => {
    setIsErrorImg(false)
    inputRef.current.value.trim() === ''
      ? setIsDisabled(true)
      : setIsDisabled(false)
  }

  const deleteImg = async (e: MouseEvent) => {
    const index = (e.currentTarget as HTMLElement).id
    const indexNumber = parseFloat(index)
    const newImageArr = bgImageArr.filter((img, index) => index !== indexNumber)
    setBgImageArr(newImageArr)
    const wallpapers = newImageArr.filter(
      (el, index) => index >= DEFAULT_NUMBER_PICTURES,
    )
    await changeUser({ wallpapers: wallpapers }, userId)
  }

  return { isLoading, bgImageArr, deleteImg, handleClickImg }
}

export const useFetchAllWallpapers = ({ userInfo }) => {
  const userWallpapers = userInfo?.wallpapers || []

  const [allWallpapers, setAllWallpapers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWallpapers = async () => {
      const wallpapers = await getWallpapers()
      setAllWallpapers([...wallpapers, ...userWallpapers])

      setIsLoading(false)
    }
    fetchWallpapers()
  }, [userInfo])

  return { wallpapers: allWallpapers, isLoading }
}
