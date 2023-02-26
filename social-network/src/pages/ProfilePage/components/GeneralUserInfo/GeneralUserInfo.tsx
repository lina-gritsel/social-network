import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import Avatar from '../../../../components/Avatar'
import Button from '../../../../components/Button'
import { PATHS } from '../../../../router/paths'
import { User } from '../../../../api'

import styles from './GeneralUserInfo.module.scss'

interface GeneralUserInfoProps {
  userInfo: User
  isMyProfile: boolean
  isFollowing: boolean
  isLoading: boolean
}

const GeneralUserInfo: FC<GeneralUserInfoProps> = ({
  userInfo,
  isMyProfile,
  isFollowing,
  isLoading,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Avatar imageUrl={userInfo?.avatar} className={styles.profileAvatar} />
      <div className={styles.wrapperInfoUser}>
        <div className={styles.userInfo}>
          <div className={styles.nameUser}>{userInfo?.name}</div>
          <div className={styles.workUser}>{userInfo?.bio}</div>
        </div>
        {!isMyProfile && (
          <Button isDisabled={isLoading} outlined className={styles.btnFriend}>
            {isFollowing ? t('unfollow') : t('follow')}
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
