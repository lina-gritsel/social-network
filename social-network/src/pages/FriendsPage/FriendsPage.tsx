import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '../../components/Layout'
import InputSearch from '../../components/InputSearch'
import { useDebounce } from '../../hooks'

import PossibleFriends from './components/FriendsPossible'
import FriendsList from './components/FriendsList'
import FriendsMenu from './components/FriendsMenu'

import { useFriendsPage } from './hooks'

import styles from './FriendsPage.module.scss'

const FriendsPage: FC = () => {
  const [searchString, setSearchString] = useState<string>('')
  const searchDebounced = useDebounce(searchString, 500)

  const { t } = useTranslation()

  const { isMyPage, list, friendsTabs, tabValue, setTabValue, name } =
    useFriendsPage()

  return (
    <Layout>
      <div className={styles.container}>
        {!isMyPage && (
          <h2>
            {t('friends')} {name}
          </h2>
        )}
        <div className={styles.mainContent}>
          <div className={styles.wrapperList}>
            <InputSearch
              placeholder={t('searchFriends')}
              onChange={(e) => setSearchString(e.target.value.toUpperCase())}
            />
            <FriendsList list={list} searchDebounced={searchDebounced} />
          </div>
          <div className={styles.wrapper}>
            <FriendsMenu
              tabs={friendsTabs}
              value={tabValue}
              setValue={setTabValue}
            />
            <div className={styles.possibleFriend}>
              <PossibleFriends />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FriendsPage
