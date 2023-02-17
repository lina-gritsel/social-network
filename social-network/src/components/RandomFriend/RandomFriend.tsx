import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import moment from 'moment'

import Button from '../Button'
import { getRandomInt } from '../../utils/utils'
import { User } from '../../api'

import styles from './RandomFriend.module.scss'
import Avatar from '../Avatar'

interface RandomFriend {
  allUsers: User[]
  isLoading: boolean
}
interface RandomUser {
  user: User
  isBirthday?: boolean
  title: string
}

const RandomFriend: FC<RandomFriend> = ({ allUsers, isLoading }) => {
  const index = getRandomInt(0, allUsers?.length)
  const randomUser = allUsers[index]

  return (
    <div className={styles.friends}>
      {isLoading && <div>Loading...</div>}
      <Friend user={randomUser} title="mightLike" />
      <Friend user={randomUser} title="birthday" isBirthday={true} />
    </div>
  )
}

const Friend: FC<RandomUser> = ({ user, isBirthday, title }) => {
  const { t } = useTranslation()

  const bdDate = moment.unix(user?.date).format('DD/MM')

  return (
    <Card className={styles.friend}>
      <div className={styles.mightLike}>{t(title)}</div>
      <div className={styles.wrapperContent}>
        <div className={styles.cardHeader}>
          <Avatar imageUrl={user?.avatar} className={styles.avatar} />

          <div>
            <div className={styles.title}>{user?.name}</div>
            <div className={styles.subTitle}>
              {isBirthday ? t(title) + ' ' + bdDate : user?.bio}
            </div>
          </div>
        </div>
        {!isBirthday && (
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
        )}
      </div>
    </Card>
  )
}
export default RandomFriend
