import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Friend from '../FriendCard'

import styles from './FriendsList.module.scss'

interface FriendsListProps {
  list: string[]
  activeTab: string
}

const FriendsList: FC<FriendsListProps> = ({ list, activeTab }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.myFriends}>
      {!!list.length && (
        <div className={styles.wrapperFriends}>
          {list?.map((userId, index) => (
            <Friend key={index} userId={userId} activeTab={activeTab} />
          ))}
        </div>
      )}
      {!list.length && <div className={styles.emtyList}>{t('notFriends')}</div>}
    </div>
  )
}

export default FriendsList
