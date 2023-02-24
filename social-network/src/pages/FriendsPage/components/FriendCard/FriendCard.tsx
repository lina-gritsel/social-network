import { FC, useEffect, useState } from 'react'
import { getUser } from '../../../../api'
import Avatar from '../../../../components/Avatar'

interface FriendProps {
  userId: string
}

import styles from './FriendCard.module.scss'

const Friend: FC<FriendProps> = ({ userId }) => {
  const [currentFriend, setCurrentFriend] = useState(null)
  useEffect(() => {
    const getCurrentFriend = async () => {
      const user = await getUser(userId)
      setCurrentFriend(user.data.user)
    }
    getCurrentFriend()
  }, [userId])

  return (
    <div className={styles.container}>
    <Avatar imageUrl={currentFriend?.avatar} className={styles.avatar}/>
    <div className={styles.friendInfo}>
      <div className={styles.name}>{currentFriend?.name}</div>
      <div>{currentFriend?.bio}</div>
    </div>
    </div>
  )
}

export default Friend
