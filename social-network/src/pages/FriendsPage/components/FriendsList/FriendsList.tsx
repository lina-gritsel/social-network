import { FC } from 'react'

import Friend from '../FriendCard'

import styles from './FriendsList.module.scss'

interface FriendsListProps {
  list: string[]
  activeTab: string
}

const FriendsList: FC<FriendsListProps> = ({ list, activeTab }) => {
  return (
    <div className={styles.myFriends}>
      {list.length && (
        <div className={styles.wrapperFriends}>
          {list?.map((userId, index) => (
            <Friend
              key={index}
              userId={userId}
              activeTab={activeTab}
            />
          ))}
        </div>
      )}
      {!list.length && <>У тебя нет друзей плак плак</>}
    </div>
  )
}

export default FriendsList
