import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '../../../../components/Button'
import Avatar from '../../../../components/Avatar'
import { PATHS } from '../../../../router/paths'
import { getUser } from '../../../../api'

import styles from './FriendCard.module.scss'

interface FriendProps {
  userId: string
  activeTab: string
}

const Friend: FC<FriendProps> = ({ userId, activeTab }) => {
  const [currentFriend, setCurrentFriend] = useState(null)
  console.log(activeTab)
  useEffect(() => {
    const getCurrentFriend = async () => {
      const { data } = await getUser(userId)
      setCurrentFriend(data.user)
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
      <Button outlined className={styles.btnFriend}>
        {activeTab === 'followings' || activeTab === 'friends'
          ? 'unfollow'
          : 'follow'}
      </Button>
    </div>
  )
}

export default Friend
