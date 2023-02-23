import { FC } from 'react'

import Layout from '../../components/Layout'

import FriendsMenu from './components/FriendsMenu'
import PossibleFriends from './components/FriendsPossible'

import styles from './FriendsPage.module.scss'

const FriendsPage: FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.myFriends}>FriendsPage</div>
        <div className={styles.wrapper}>
          <FriendsMenu />
          <PossibleFriends />
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage
