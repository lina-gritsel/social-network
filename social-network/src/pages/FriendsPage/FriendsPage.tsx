import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '../../components/Layout'

import PossibleFriends from './components/FriendsPossible'
import FriendsList from './components/FriendsList'
import FriendsMenu from './components/FriendsMenu'

import InputSearch from '../../components/InputSearch'
import styles from './FriendsPage.module.scss'
import { useDebounce } from '../../hooks'
import { useFriendsPage } from './hooks'

const FriendsPage: FC = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')
  const searchDebounced = useDebounce(search, 500)

  const { list, friendsTabs, tabValue, setTabValue } = useFriendsPage()

  return (
    <Layout>
      <div className={styles.container}>
        <InputSearch
          placeholder={t('searchFriends')}
          onChange={(e) => setSearch(e.target.value.trim().toLocaleLowerCase())}
        />
        <FriendsList list={list} activeTab={tabValue} />
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
