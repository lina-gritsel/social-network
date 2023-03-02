import { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getUserInfoSelector } from '../../../../store/selectors'
import { useFollowFriends } from '../../../../hooks'
import Button from '../../../../components/Button'
import Avatar from '../../../../components/Avatar'
import { PATHS } from '../../../../router/paths'

import styles from './FriendCard.module.scss'

interface FriendProps {
  id: string
  name: string
  bio: string
  avatar?: string
}

const Friend: FC<FriendProps> = ({ id, name, bio, avatar }) => {
  const myInfo = useSelector(getUserInfoSelector)

  const { t } = useTranslation()

  const isButton = id !== myInfo?.id

  const { followingExist, changeFollow, isLoadingFollow } = useFollowFriends(
    myInfo,
    id,
  )

  return (
    <div className={styles.container}>
      <NavLink to={`${PATHS.PROFILE}/${id}`}>
        <div className={styles.wrapperFriend}>
          <Avatar imageUrl={avatar} className={styles.avatar} />
          <div className={styles.friendInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.bio}>{bio}</div>
          </div>
        </div>
      </NavLink>
      {isButton && (
        <Button
          isDisabled={isLoadingFollow}
          outlined
          className={styles.btnFriend}
          onClick={changeFollow}
        >
          {followingExist ? t('unfollow') : t('follow')}
        </Button>
      )}
    </div>
  )
}

export default Friend
