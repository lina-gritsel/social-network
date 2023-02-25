import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import { useTabs } from '../../hooks/useTabs'

export const useFriendsPage = () => {
  const { followers, followings } = useSelector(getUserInfoSelector)

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
