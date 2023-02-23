import { FC } from 'react'
import Layout from '../../components/Layout'

import styles from './FriendsPage.module.scss'

const FriendsPage: FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.myFriends}>FriendsPage</div>
        <div className={styles.wrapper}>
          <div className={styles.allFollowers}>{'Friends'}</div>
          <div className={styles.mightLike}>{'newFriends'}</div>
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage
