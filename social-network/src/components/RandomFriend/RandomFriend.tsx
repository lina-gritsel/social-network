import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import moment from 'moment'

import { getRandomInt } from '../../utils/utils'
import { User } from '../../api'
import Avatar from '../Avatar'
import Button from '../Button'

import styles from './RandomFriend.module.scss'
import { LINKS } from './constants'

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
  const indexArr = [
    getRandomInt(0, allUsers?.length),
    getRandomInt(0, allUsers?.length),
  ]
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

  const bdDate = moment.unix(user?.date).format('DD/MM')

  return (
    <Card className={styles.friendCard}>
      <div className={styles.mightLike}>{t(title)}</div>
      <div className={styles.wrapperContent}>
        <div className={styles.cardHeader}>
          <Avatar imageUrl={user?.avatar} className={styles.avatar} />
          {isLoading ? (
            <div className={styles.loading}>{t('loading')}</div>
          ) : (
            <div>
              <div className={styles.title}>{user?.name}</div>
              <div className={styles.subTitle}>
                {isBirthday ? t(title) + ' ' + bdDate : user?.bio}
              </div>
            </div>
          )}
        </div>
        {!isBirthday && (
          <>
            <div className={styles.icons}>
              <a
                href={LINKS.instagram + ('' || user?.instagram)}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href={LINKS.twitter + ('' || user?.twitter)}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon />
              </a>
              <a
                href={LINKS.facebook + ('' || user?.facebook)}
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon />
              </a>
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
