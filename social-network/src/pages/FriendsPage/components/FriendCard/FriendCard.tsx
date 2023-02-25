import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { followUser, getUser, unsubsribeUser } from '../../../../api'
import { getUserInfoSelector } from '../../../../store/selectors'
import { fetchUser } from '../../../../store/actions'
import { useAppDispatch } from '../../../../store'
import Button from '../../../../components/Button'
import Avatar from '../../../../components/Avatar'
import { PATHS } from '../../../../router/paths'

import styles from './FriendCard.module.scss'

interface FriendProps {
  userId: string
  activeTab: string
}

const Friend: FC<FriendProps> = ({ userId, activeTab }) => {
  const userInfo = useSelector(getUserInfoSelector)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [currentFriend, setCurrentFriend] = useState(null)
  
  useEffect(() => {
    const getCurrentFriend = async () => {
      const { data } = await getUser(userId)
      setCurrentFriend(data.user)
    }
    getCurrentFriend()
  }, [userId])

  const isUnfollow = userInfo?.followings.includes(userId)

  const changeFollow = async () => {
    isUnfollow
      ? await unsubsribeUser(userInfo?.id, { currentUserId: currentFriend?.id })
      : await followUser(userInfo?.id, { currentUserId: currentFriend?.id })
    dispatch(fetchUser(userInfo?.id))
  }

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
      <Button outlined className={styles.btnFriend} onClick={changeFollow}>
        {isUnfollow ? t('unfollow') : t('follow')}
      </Button>
    </div>
  )
}

export default Friend
