import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getUserInfoSelector } from '../../store/selectors'
import { useTabs } from '../../hooks/useTabs'
import { useEffect, useState } from 'react'
import { getUser, User } from '../../api'

const fetchUserInfo = (id: string) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await getUser(id)
      setUser(data?.user)
    }
    fetchUserInfo()
  }, [id])

  const userInfo = {
    followers: user?.followers,
    followings: user?.followings,
    avatar: user?.avatar,
    name: user?.name,
  }

  return userInfo
}

export const useFriendsPage = () => {
  const myId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
  const currentUserId = useParams<{ id: string }>().id

  const isMyPage = currentUserId === myId || currentUserId === 'me'

  const myInfo = useSelector(getUserInfoSelector)
  const userInfo = fetchUserInfo(currentUserId)

  const currentUserInfo = isMyPage? myInfo : userInfo

  const { followers, followings, name } = currentUserInfo

  const friends = followers
    ? followers?.filter(({ id }) =>
        followings?.map(({ id }) => id).includes(id),
      )
    : []

  const {
    tabs: friendsTabs,
    value: tabValue,
    setValue: setTabValue,
  } = useTabs({ tabs: FRIENDS_TABS, defaultValue: FRIENDS_TABS[0].value })

  const getCertainList = () => {
    if (tabValue === 'followers') return followers
    if (tabValue === 'followings') return followings
    return friends
  }

  return {
    friendsTabs,
    tabValue,
    setTabValue,
    name,
    isMyPage,
    list: getCertainList(),
  }
}

export const FRIENDS_TABS = [
  {
    label: 'friends',
    value: 'friends',
  },
  {
    label: 'followers',
    value: 'followers',
  },
  {
    label: 'followings',
    value: 'followings',
  },
]
