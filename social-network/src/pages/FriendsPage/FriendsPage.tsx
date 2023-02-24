import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import Layout from '../../components/Layout'

import PossibleFriends from './components/FriendsPossible'
import FriendsList from './components/FriendsList'
import FriendsMenu from './components/FriendsMenu'

import styles from './FriendsPage.module.scss'
import { Tabs } from './types'

const FriendsPage: FC = () => {
  const userInfo = useSelector(getUserInfoSelector)
  const followers = userInfo?.followers
  const followings = userInfo?.followings
  const friends =
    (followers?.length !== 0 && followers)
      ? followers?.filter((user) => followings?.includes(user))
      : []

  const [activeMenuItem, setActiveMenuItem] = useState<Tabs>(Tabs.FRIENDS)

  return (
    <Layout>
      <div className={styles.container}>
        <FriendsList
          friends={friends}
          followers={followers}
          followings={followings}
          activeMenuItem={activeMenuItem}
        />
        <div className={styles.wrapper}>
          <FriendsMenu
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
          />
          <PossibleFriends />
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage
