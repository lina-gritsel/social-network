import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputSearch from '../../../../components/InputSearch'
import { useDebounce } from '../../../../hooks'
import { Tabs } from '../../types'
import Friend from '../FriendCard'

import styles from './FriendsList.module.scss'

interface FriendsListProps {
  friends: string[]
  followers: string[]
  followings: string[]
  activeMenuItem: string
}

const FriendsList: FC<FriendsListProps> = ({
  friends,
  followers,
  followings,
  activeMenuItem,
}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [selectedList, setSelectedList] = useState<string[]>()

  const searchDebounced = useDebounce(search, 500)

  useEffect(() => {
    if (activeMenuItem === Tabs.FOLLOWERS) {
      setSelectedList(followers)
    }
    if (activeMenuItem === Tabs.FOLLOWINGS) {
      setSelectedList(followings)
    }
    if (activeMenuItem === Tabs.FRIENDS) {
      setSelectedList(friends)
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
