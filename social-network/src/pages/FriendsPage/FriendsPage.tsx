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

  const { list, friendsTabs, tabValue, setTabValue } =
    useFriendsPage()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapperList}>
          <InputSearch
            placeholder={t('searchFriends')}
            onChange={(e) => setSearchString(e.target.value.toUpperCase())}
          />
          <FriendsList list={list} searchDebounced={searchDebounced}/>
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
