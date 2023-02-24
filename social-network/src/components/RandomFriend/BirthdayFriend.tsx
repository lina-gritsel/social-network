import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Card } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { getRandomInt } from '../../utils'
import { PATHS } from '../../router/paths'
import { getUserInfoSelector } from '../../store/selectors'
import { User } from '../../api'
import Avatar from '../Avatar'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  allUsers: User[]
  isLoading: boolean
}

export const BirthdayFriend: FC<RandomFriend> = ({ allUsers, isLoading }) => {
  const { t } = useTranslation()
  const userInfo = useSelector(getUserInfoSelector)
  const followers = userInfo?.followers || []
  const followings = userInfo?.followings || []

  const friendsArr = [...followers, ...followings]
  const randomIndex = getRandomInt(0, friendsArr?.length)

  const birthdayUser = allUsers.filter(
    (user) => user.id === friendsArr[randomIndex],
  )[0]

  const formattedBirthdayDate = moment.unix(birthdayUser?.date).format('DD/MM')

  return (
    <div className={styles.friends}>
      <Card className={styles.friendCard}>
        <div className={styles.mightLike}>{t('birthday')}</div>
        <div className={styles.wrapperContent}>
          <div className={styles.cardHeader}>
            <NavLink to={`${PATHS.PROFILE}/${birthdayUser?.id}`}>
              <Avatar
                imageUrl={birthdayUser?.avatar}
                className={styles.avatar}
              />
            </NavLink>
            {isLoading ? (
              <div className={styles.loading}>{t('loading')}</div>
            ) : (
              <div>
                <NavLink to={`${PATHS.PROFILE}/${birthdayUser?.id}`}>
                  <div className={styles.title}>{birthdayUser?.name}</div>
                </NavLink>
                <div className={styles.subTitle}>
                  {t('birthday') + ' ' + formattedBirthdayDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
