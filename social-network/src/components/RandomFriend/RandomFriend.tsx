import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import moment from 'moment'

import Button from '../Button'
import { getRandomInt } from '../../utils/utils'
import { User } from '../../api'

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
  const index = getRandomInt(0, allUsers?.length)
  const randomUser = allUsers[index]

  return (
    <div className={styles.friends}>
      <Friend user={randomUser} isLoading={isLoading} title="mightLike" />
      <Friend
        user={randomUser}
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
    <Card>
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
            <div className={styles.title}>
              {isLoading ? t('loading') : user?.name}
            </div>
            <div className={styles.subTitle}>
              {isLoading
                ? t('loading')
                : isBirthday
                ? t(title) + ' ' + bdDate
                : user?.bio}
            </div>
          </div>
        </div>
        {!isBirthday ? (
          <>
            <div className={styles.icons}>
              <a
                href="http://www.instagram.com/prosto_a.lin.a"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
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
