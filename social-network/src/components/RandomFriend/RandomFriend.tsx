import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Card } from '@mui/material'
import { useSelector } from 'react-redux'

import { getRandomInt } from '../../utils'
import { PATHS } from '../../router/paths'
import { getUserInfoSelector } from '../../store/selectors'
import { followUser, User } from '../../api'
import Avatar from '../Avatar'
import Button from '../Button'
import Loader from '../Loader'

import { FIELD } from './constants'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  allUsers: User[]
  isLoading: boolean
}
interface RandomUser {
  user: User
  setUsers?: Dispatch<SetStateAction<User[]>>
  title: string
  isLoading: boolean
}

export const RandomFriend: FC<RandomFriend> = ({ allUsers, isLoading }) => {
  const userInfo = useSelector(getUserInfoSelector)
  const [randomUser, setRandomUser] = useState<User>()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    setUsers(allUsers)
  }, [isLoading])

  useEffect(() => {
    const possibleFrieds = users?.filter(
      (user) => !userInfo?.followings?.includes(user?.id),
    )
    const randomIndex = getRandomInt(0, possibleFrieds?.length)

    setRandomUser(possibleFrieds[randomIndex])
  }, [users, userInfo?.followings])

  if (isLoading) {
    return <Loader className={styles.loader}/>
  }

  return (
    randomUser && (
      <Friend
        user={randomUser}
        isLoading={isLoading}
        title="mightLike"
        setUsers={setUsers}
      />
    )
  )
}

const Friend: FC<RandomUser> = ({ user, title, isLoading, setUsers }) => {
  const { t } = useTranslation()

  const myId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const userLink = [user?.instagram, user?.twitter, user?.facebook]

  const follow = async () => {
    await followUser(myId, { currentUserId: user?.id })
    setUsers((prev) =>
      prev.filter((currentUser) => currentUser?.id !== user?.id),
    )
  }
  const ignore = () => {
    setUsers((prev) =>
      prev.filter((currentUser) => currentUser?.id !== user?.id),
    )
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
              <div className={styles.subTitle}>{user?.bio}</div>
            </div>
          )}
        </div>

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
            onClick={() => ignore()}
            className={styles.ignorFriends}
            outlined
          >
            {t('ignore')}
          </Button>
          <Button onClick={() => follow()} className={styles.followFriends}>
            {t('follow')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
