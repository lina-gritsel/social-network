import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Avatar from '../../../../components/Avatar'
import { PATHS } from '../../../../router/paths'
import { getUser } from '../../../../api'

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
      <NavLink to={`${PATHS.PROFILE}/${currentFriend?.id}`}>
        <Avatar imageUrl={currentFriend?.avatar} className={styles.avatar} />
      </NavLink>
      <div className={styles.friendInfo}>
        <div className={styles.name}>{currentFriend?.name}</div>
        <div className={styles.bio}>{currentFriend?.bio}</div>
      </div>
    </div>
  )
}

export default Friend
