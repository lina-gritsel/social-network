import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import { Card } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'
import Button from '../Button'

import styles from './RandomFriend.module.scss'

interface RandomFriend {
  username: string
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
  username,
  avatarColor,
  avatarImg,
  profession,
}) => {
  const { t } = useTranslation()

  return (
    <Card className={styles.friend}>
      <div className={styles.mightLike}>{t('mightLike')}</div>
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
            <div className={styles.subTitle}>{profession}</div>
          </div>
        </div>
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
      </div>
    </Card>
  )
}
export default RandomFriend
