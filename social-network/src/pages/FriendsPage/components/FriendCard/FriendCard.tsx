import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Avatar from '../../../../components/Avatar'
import { PATHS } from '../../../../router/paths'
import { getUser } from '../../../../api'

interface FriendProps {
  userId: string
  nameButton: string
}

import styles from './FriendCard.module.scss'
import Button from '../../../../components/Button'

const Friend: FC<FriendProps> = ({ userId, nameButton }) => {
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
      <div className={styles.wrapperFriend}>
        <NavLink to={`${PATHS.PROFILE}/${currentFriend?.id}`}>
          <Avatar imageUrl={currentFriend?.avatar} className={styles.avatar} />
        </NavLink>
        <div className={styles.friendInfo}>
          <div className={styles.name}>{currentFriend?.name}</div>
          <div className={styles.bio}>{currentFriend?.bio}</div>
        </div>
      </div>
      <Button outlined className={styles.btnFriend}>{nameButton}</Button>
    </div>
  )
}

export default Friend
