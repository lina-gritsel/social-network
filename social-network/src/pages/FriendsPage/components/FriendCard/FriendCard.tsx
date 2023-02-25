import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { followUser, unsubsribeUser } from '../../../../api'
import { getUserInfoSelector } from '../../../../store/selectors'
import { fetchUser } from '../../../../store/actions'
import { useAppDispatch } from '../../../../store'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const userInfo = useSelector(getUserInfoSelector)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const isUnfollow = userInfo?.followings?.map(({ id }) => id).includes(id)

  const changeFollow = async () => {
    setIsLoading(true)
    isUnfollow
      ? await unsubsribeUser(userInfo?.id, { currentUserId: id })
      : await followUser(userInfo?.id, { currentUserId: id })
    dispatch(fetchUser(userInfo?.id))
    setIsLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapperFriend}>
        <NavLink to={`${PATHS.PROFILE}/${id}`}>
          <Avatar imageUrl={avatar} className={styles.avatar} />
        </NavLink>
        <div className={styles.friendInfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
      <Button isDisabled={isLoading} outlined className={styles.btnFriend} onClick={changeFollow}>
        {isUnfollow ? t('unfollow') : t('follow')}
      </Button>
    </div>
  )
}

export default Friend
