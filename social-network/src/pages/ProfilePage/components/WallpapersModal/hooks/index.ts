import { useEffect, useRef, useState } from 'react'

import { getWallpapers, updateUser, User } from '../../../../../api'
import { useModal } from '../../../../../hooks'
import { DEFAULT_WALLPAPER } from '../../../constants'

export const useWallpaperModal = (userInfo: User) => {
  const [currentImage, setCurrentImage] = useState<string>('')
  const [savedImage, setSavedImage] = useState<string>('')
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>()

  const {
    visible: visibleWallpapersModal,
    open: openWallpapersModal,
    close,
  } = useModal()

  const closeWallpapersModal = (): void => {
    close()
    setCurrentImage(savedImage || userInfo?.background)
    setIsErrorImg(false)
  }

  const {
    isLoading,
    allWallpapers,
    defaultWallpapers,
    setAllWallpapers,
    userWallpapers,
    setUserWallpapers,
  } = useFetchAllWallpapers(userInfo)

  const onDeleteImage = async (imageUrl: string): Promise<void> => {
    try {
      const wallpapers = userWallpapers.filter((image) => image !== imageUrl)
      const isCurrentUserImage = imageUrl === currentImage
      
      await updateUser({
        ...userInfo,
        date: parseFloat(userInfo.date as any),
        background: isCurrentUserImage ? DEFAULT_WALLPAPER : currentImage,
        wallpapers,
      })
      setUserWallpapers(userWallpapers.filter((image) => image !== imageUrl))
      setAllWallpapers(allWallpapers.filter((image) => image !== imageUrl))

      setCurrentImage(isCurrentUserImage ? DEFAULT_WALLPAPER : currentImage)
      setSavedImage(isCurrentUserImage ? DEFAULT_WALLPAPER : currentImage)
    } catch (error) {
      console.log(error)
    }
  }

  const onSaveImage = async (): Promise<void> => {
    try {
      const wallpapes = [...defaultWallpapers, ...userWallpapers]
      const imageExist = !!wallpapes.find((image) => image === currentImage)

      await updateUser({
        ...userInfo,
        date: parseFloat(userInfo.date as any),
        background: currentImage,
        wallpapers: imageExist
          ? userWallpapers
          : [...userWallpapers, currentImage],
      })
      setSavedImage(currentImage)
      close()
    } catch (error) {
      console.log(error)
    }
  }

  const onAddCurrentImage = (imageUrl: string) => {
    try {
      const imageExist = !!allWallpapers.find((image) => image === imageUrl)

      if (!imageExist) {
        setAllWallpapers([...allWallpapers, imageUrl])
        setUserWallpapers([...userWallpapers, imageUrl])
      }

      setIsErrorImg(false)
      setCurrentImage(imageUrl)
    } catch (error) {
      console.log(error)
    }
  }
  const onErrorImage = () => {
    setAllWallpapers((prev) => prev.slice(0, -1))
    setUserWallpapers((prev) => prev.slice(0, -1))
    setCurrentImage(userInfo?.background)
    setIsErrorImg(true)
    inputRef.current.value = ''
  }

  return {
    inputRef,
    isLoading,
    isErrorImg,
    onAddCurrentImage,
    wallpapers: allWallpapers,
    currentImage: currentImage || savedImage || userInfo?.background,
    onSaveImage,
    visibleWallpapersModal,
    openWallpapersModal,
    closeWallpapersModal,
    onDeleteImage,
    onErrorImage,
    setIsErrorImg,
  }
}

export const useFetchAllWallpapers = (userInfo: User) => {
  const [defaultWallpapers, setDefaultWallpapers] = useState<string[]>([])
  const [allWallpapers, setAllWallpapers] = useState<string[]>([])
  const [userWallpapers, setUserWallpapers] = useState<string[]>(
    userInfo?.wallpapers || [],
  )

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWallpapers = async () => {
      const wallpapers = await getWallpapers()

      setDefaultWallpapers(wallpapers)
      setAllWallpapers([...wallpapers, ...(userInfo?.wallpapers || [])])

      setIsLoading(false)
    }
    fetchWallpapers()
  }, [userInfo])

  const onAddImage = (imageUrl: string) => {
    setAllWallpapers([...allWallpapers, imageUrl])
  }

  return {
    defaultWallpapers,
    allWallpapers,
    isLoading,
    onAddImage,
    setAllWallpapers,
    setUserWallpapers,
    userWallpapers,
  }
}
