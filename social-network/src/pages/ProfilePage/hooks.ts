import moment from 'moment'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { getUser, getWallpapers, changeUser, User } from '../../api'
import { getUserInfoSelector } from '../../store/selectors'
import { PATHS } from '../../router/paths'

import { DEFAULT_WALLPAPER, DEFAULT_NUMBER_PICTURES } from './constants'

export const useProfilePage = () => {
  const userInfo = useSelector(getUserInfoSelector)

  const profileInfoArr = [
    userInfo?.gender,
    moment.unix(userInfo?.date).format('DD/MM/YYYY'),
    userInfo?.location,
    userInfo?.facebook,
    userInfo?.twitter,
    userInfo?.instagram,
    userInfo?.followers?.length || '-',
    userInfo?.followings?.length || '-',
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bgImageArr, setBgImageArr] = useState<string[]>([])
  const [bgImage, setBgImage] = useState<string>(
    userInfo?.background || DEFAULT_WALLPAPER,
  )

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

  return {
    isOpen,
    isLoading,
    bgImage,
    userInfo,
    bgImageArr,
    isErrorImg,
    userWallpapers,
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

export const useFetchProfileInfo = (id: string) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
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

  const userProfileInfoArr = [
    user?.gender,
    moment.unix(user?.date).format('DD/MM/YYYY'),
    user?.location,
    user?.facebook,
    user?.twitter,
    user?.instagram,
    user?.followers?.length || '-',
    user?.followings?.length || '-',
  ]

  return {
    user,
    isLoading,
    userProfileInfoArr,
  }
}

export const chekingForFriends = (userInfo, selectedUserInfo) => {
const followers = userInfo.followers
const followings = userInfo.followings

// const selectedUserId = selectedUserInfo.id
// const followersSelecedUser = selectedUserInfo.followers

const friends = followers
? followers?.filter(({ id }) =>
    followings?.map(({ id }) => id).includes(id),
  )
: []

const isFriend = !!friends.map(({id})=> id === selectedUserInfo.id)

console.log(friends)
console.log(isFriend)


}
