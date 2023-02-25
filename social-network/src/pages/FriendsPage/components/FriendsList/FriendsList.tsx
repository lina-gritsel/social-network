import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Follow } from '../../../../api'
import Friend from '../FriendCard'

import styles from './FriendsList.module.scss'

interface FriendsListProps {
  list: Follow[]
  searchDebounced: string
}

const FriendsList: FC<FriendsListProps> = ({ list, searchDebounced }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.myFriends}>
      {!!list?.length && (
        <div className={styles.wrapperFriends}>
          {list
            ?.filter(({ name }) => name.toUpperCase().includes(searchDebounced))
            .map((user, index) => (
              <Friend key={index} {...user} />
            ))}
        </div>
      )}
      {!list?.length && <div className={styles.emtyList}>{t('notFriends')}</div>}
    </div>
  )
}

export default FriendsList
