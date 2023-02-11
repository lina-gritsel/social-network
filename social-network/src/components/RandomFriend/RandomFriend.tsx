import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import { Card, CardHeader } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'
import Button from '../Button'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  name: string
  avatarColor: string
  avatarImg?: string
  profession: string
}

const RandomFriend: FC = () => {
  return (
    <div className={styles.friends}>
      {friends.map((friend, index) =>
        index % 5 === 0 ? <Friend key={index} {...friend} /> : null,
      )}
    </div>
  )
}

const Friend: FC<RandomFriend> = ({
  name,
  avatarColor,
  avatarImg,
  profession,
}) => {
  const { t } = useTranslation()

  return (
    <Card className={styles.friend}>
      <div className={styles.mightLike}>{t('mightLike')}</div>
      <div className={styles.cardHeader}>
        <Avatar
          sx={{ bgcolor: avatarColor }}
          aria-label="recipe"
          alt={name}
          src={avatarImg}
          className={styles.avatar}
        ></Avatar>
        <div>
          <div className={styles.title}>{name}</div>
          <div className={styles.subTitle}>{profession}</div>
        </div>
      </div>

      <div className={styles.icons}>
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </div>
      <div className={styles.btnWrapper}>
        <Button className={styles.ignorFriends} outlined={true}>
          {t('ignore')}
        </Button>
        <Button>{t('follow')}</Button>
      </div>
    </Card>
  )
}
export default RandomFriend
