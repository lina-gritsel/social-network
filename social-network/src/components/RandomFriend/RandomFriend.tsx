import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Card } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { getRandomInt } from '../../utils'
import { PATHS } from '../../router/paths'
import { getUserInfoSelector } from '../../store/selectors'
import { followUser, unsubsribeUser, User } from '../../api'
import Avatar from '../Avatar'
import Button from '../Button'

import { FIELD } from './constants'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  allUsers: User[]
  isLoading: boolean
}
interface RandomUser {
  user: User
  isBirthday?: boolean
  title: string
  isLoading: boolean
}

const RandomFriend: FC<RandomFriend> = ({ allUsers, isLoading }) => {
  const userInfo = useSelector(getUserInfoSelector)
  const indexArr = [
    getRandomInt(0, allUsers?.length),
    getRandomInt(0, allUsers?.length),
  ]
  // const randomUsers = [allUsers[indexArr[0]], allUsers[indexArr[1]]]


  // const possibleFrieds = allUsers?.filter(
  //   (user) => !userInfo?.followings.includes(user?.id),
  // )
  // const indexArr = [
  //   getRandomInt(0, possibleFrieds?.length),
  //   getRandomInt(0, possibleFrieds?.length),
  // ]
  const randomUsers = [allUsers[indexArr[0]], allUsers[indexArr[1]]]

  return (
    <div className={styles.friends}>
      <Friend user={randomUsers[0]} isLoading={isLoading} title="mightLike" />
      <Friend
        user={randomUsers[1]}
        isLoading={isLoading}
        title="birthday"
        isBirthday={true}
      />
    </div>
  )
}

const Friend: FC<RandomUser> = ({ user, isBirthday, title, isLoading }) => {
  const { t } = useTranslation()

  const formattedBirthdayDate = moment.unix(user?.date).format('DD/MM')

  const myId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const userLink = [user?.instagram, user?.twitter, user?.facebook]

  const follow = async () => {
    await followUser(myId, { currentUserId: user?.id })
  }
  const unsubscribe = async () => {
    await unsubsribeUser(myId, { currentUserId: user?.id })
  }

  return (
    <Card className={styles.friendCard}>
      <div className={styles.mightLike}>{t(title)}</div>
      <div className={styles.wrapperContent}>
        <div className={styles.cardHeader}>
          <NavLink to={`${PATHS.PROFILE}/${user?.id}`}>
            <Avatar imageUrl={user?.avatar} className={styles.avatar} />
          </NavLink>
          {isLoading ? (
            <div className={styles.loading}>{t('loading')}</div>
          ) : (
            <div>
              <NavLink to={`${PATHS.PROFILE}/${user?.id}`}>
                <div className={styles.title}>{user?.name}</div>
              </NavLink>
              <div className={styles.subTitle}>
                {isBirthday
                  ? t(title) + ' ' + formattedBirthdayDate
                  : user?.bio}
              </div>
            </div>
          )}
        </div>
        {!isBirthday && (
          <>
            <div className={styles.icons}>
              {FIELD.map(({ icon, path }, index) => (
                <a
                  key={index}
                  href={path + (userLink[index] || '')}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className={styles.btnWrapper}>
              <Button
                onClick={() => unsubscribe()}
                className={styles.ignorFriends}
                outlined
              >
                {t('ignore')}
              </Button>
              <Button onClick={() => follow()} className={styles.followFriends}>
                {t('follow')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
export default RandomFriend
