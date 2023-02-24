import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '../../components/Layout'

import PossibleFriends from './components/FriendsPossible'
import FriendsList from './components/FriendsList'
import FriendsMenu from './components/FriendsMenu'

import InputSearch from '../../components/InputSearch'
import styles from './FriendsPage.module.scss'
import { useFriendsPage } from './hooks'

const FriendsPage: FC = () => {
  const { t } = useTranslation()

  const { list, friendsTabs, tabValue, setTabValue, setSearch } =
    useFriendsPage()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapperList}>
          <InputSearch
            placeholder={t('searchFriends')}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
          />
          <FriendsList list={list} activeTab={tabValue} />
        </div>
        <div className={styles.wrapper}>
          <FriendsMenu
            tabs={friendsTabs}
            value={tabValue}
            setValue={setTabValue}
          />
          <PossibleFriends />
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage
