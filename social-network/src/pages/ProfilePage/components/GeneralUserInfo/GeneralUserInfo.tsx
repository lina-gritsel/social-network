import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useFollowFriends } from '../../../../hooks'
import Avatar from '../../../../components/Avatar'
import Button from '../../../../components/Button'
import { PATHS } from '../../../../router/paths'
import { User } from '../../../../api'

import styles from './GeneralUserInfo.module.scss'

interface GeneralUserInfoProps {
  userInfo: User
  myInfo: User
  isMyProfile: boolean
}

const GeneralUserInfo: FC<GeneralUserInfoProps> = ({
  userInfo,
  myInfo,
  isMyProfile,
}) => {
  const { t } = useTranslation()

  const { followingExist, changeFollow, isLoadingFollow } = useFollowFriends(
    myInfo,
    userInfo?.id,
  )

  return (
    <>
      <Avatar imageUrl={userInfo?.avatar} className={styles.profileAvatar} />
      <div className={styles.wrapperInfoUser}>
        <div className={styles.userInfo}>
          <div className={styles.nameUser}>{userInfo?.name}</div>
          <div className={styles.workUser}>{userInfo?.bio}</div>
        </div>
        {!isMyProfile && (
          <Button
          isDisabled={isLoadingFollow}
          outlined
          className={styles.btnFriend}
          onClick={changeFollow}
        >
          {followingExist ? t('unfollow') : t('follow')}
        </Button>
        )}
        {isMyProfile && (
          <NavLink to={PATHS.SETTINGS}>
            <Button className={styles.editInfo}>{t('settings')}</Button>
          </NavLink>
        )}
      </div>
    </>
  )
}

export default GeneralUserInfo
