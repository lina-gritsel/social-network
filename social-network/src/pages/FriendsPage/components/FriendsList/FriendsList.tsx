import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputSearch from '../../../../components/InputSearch'
import { Tabs } from '../../types'
import Friend from '../FriendCard'

import styles from './FriendsList.module.scss'

interface FriendsListProps {
  followers: string[]
  followings: string[]
  activeMenuItem: string
}

const FriendsList: FC<FriendsListProps> = ({
  followers,
  followings,
  activeMenuItem,
}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [selectedList, setSelectedList] = useState<string[]>()

  useEffect(() => {
    if (activeMenuItem === Tabs.FOLLOWERS) {
      setSelectedList(followers)
    }
    if (activeMenuItem === Tabs.FOLLOWINGS) {
      setSelectedList(followings)
    }
  }, [activeMenuItem])

  return (
    <div className={styles.myFriends}>
      <InputSearch
        placeholder={t('searchFriends')}
        onChange={(e) => setSearch(e.target.value.trim().toLocaleLowerCase())}
      />
      <div className={styles.wrapperFriends}>
        {selectedList?.map((userId, index) => {
          return <Friend key={index} userId={userId} />
        })}
      </div>
    </div>
  )
}

export default FriendsList
