import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputSearch from '../../components/InputSearch'
import Layout from '../../components/Layout'
import FriendsMenu from './components/FriendsMenu'

import styles from './FriendsPage.module.scss'

const FriendsPage: FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.myFriends}>FriendsPage</div>
        <div className={styles.wrapper}>
          <FriendsMenu/>
          <div className={styles.mightLike}>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage