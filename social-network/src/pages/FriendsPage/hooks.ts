import { useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { useDebounce } from '../../hooks'
import { useTabs } from '../../hooks/useTabs'

export const useFriendsPage = () => {
  const [searchString, setSearchString] = useState<string>('')

  const searchDebounced = useDebounce(searchString, 500)

  const { followers, followings } = useSelector(getUserInfoSelector)

  const friends = followers?.length
    ? followers?.filter((user) => followings?.includes(user))
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
    searchString: searchDebounced,
    setSearch: setSearchString,
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
