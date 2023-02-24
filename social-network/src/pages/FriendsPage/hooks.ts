import { useSelector } from 'react-redux'
import { useTabs } from '../../hooks/useTabs'
import { getUserInfoSelector } from '../../store/selectors'

export const useFriendsPage = () => {
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
