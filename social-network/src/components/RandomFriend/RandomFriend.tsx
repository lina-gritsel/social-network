import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'
import Button from '../Button'
import { getRandomInt, sortBirthday } from '../../constants/constants'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  username: string
  title: string
  avatarColor: string
  avatarImg?: string
  profession?: string
  birthday?: string
  isBirthday?: boolean
}

const RandomFriend: FC = () => {
  const index = getRandomInt(0, friends.length - 1)
  const friend = friends[index]
  const bdFriend = friends.sort((a, b) =>
    sortBirthday(a.birthday, b.birthday),
  )[0]

  return (
    <div className={styles.friends}>
      <Friend {...friend} title="mightLike" />
      <Friend {...bdFriend} title="birthday" isBirthday={true} />
    </div>
  )
}

const Friend: FC<RandomFriend> = ({
  username,
  avatarColor,
  avatarImg,
  profession,
  title,
  birthday,
  isBirthday,
}) => {
  const { t } = useTranslation()

  return (
    <Card className={styles.friend}>
      <div className={styles.mightLike}>{t(title)}</div>
      <div className={styles.wrapperContent}>
        <div className={styles.cardHeader}>
          <Avatar
            sx={{ bgcolor: avatarColor }}
            aria-label="recipe"
            alt={username}
            src={avatarImg}
            className={styles.avatar}
          />

          <div>
            <div className={styles.title}>{username}</div>
            <div className={styles.subTitle}>
              {isBirthday ? t(title) + ' ' + birthday : profession}
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
