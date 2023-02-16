import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import moment from 'moment'

import Button from '../Button'
import { getRandomInt, sortBirthday } from '../../constants/constants'
import { getAllUsers, User } from '../../api'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  user: User
  isBirthday?: boolean
  title: string
}

const RandomFriend: FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    getAllUsers().then((res) =>
      setAllUsers(res.users.filter((user) => user.id !== userId)),
    )
  }, [])

  const index = getRandomInt(0, allUsers?.length)
  console.log(index)

  const randomUser = allUsers[index]

  // const sortBirthday = (a, b) => {
  //   const currentYear = moment(moment(), 'YYYY/MM/DD').format('YYYY')
  //   const currentTime = moment()
  // }

  return (
    <div className={styles.friends}>
      <Friend user={randomUser} title="mightLike" />
      <Friend user={randomUser} title="birthday" isBirthday={true} />
    </div>
  )
}

const Friend: FC<RandomFriend> = ({ user, isBirthday, title }) => {
  const { t } = useTranslation()

  const bdDate = moment.unix(user?.date).format('DD/MM')

  return (
    <Card className={styles.friend}>
      <div className={styles.mightLike}>{t(title)}</div>
      <div className={styles.wrapperContent}>
        <div className={styles.cardHeader}>
          <Avatar
            aria-label="recipe"
            alt={user?.name}
            src={user?.avatar}
            className={styles.avatar}
          />

          <div>
            <div className={styles.title}>{user?.name}</div>
            <div className={styles.subTitle}>
              {isBirthday ? t(title) + ' ' + bdDate : user?.bio}
            </div>
          </div>
        </div>
        {!isBirthday ? (
          <>
            <div className={styles.icons}>
              <InstagramIcon />
              <FacebookIcon />
              <TwitterIcon />
            </div>
            <div className={styles.btnWrapper}>
              <Button className={styles.ignorFriends} outlined>
                {t('ignore')}
              </Button>
              <Button>{t('follow')}</Button>
            </div>
          </>
        ) : null}
      </div>
    </Card>
  )
}
export default RandomFriend
