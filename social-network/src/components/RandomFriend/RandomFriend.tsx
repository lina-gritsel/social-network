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
  username: string
  avatarColor: string
  avatarImg?: string
  profession: string
}

const RandomFriend: FC = () => {
  const { t } = useTranslation()

  return (
      <div className={styles.friends}>
        <div>{t('mightLike')}</div>
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
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: avatarColor }}
            aria-label="recipe"
            alt={username}
            src={avatarImg}
          >
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={profession}
        className={styles.cardHeader}
      />
      <div className={styles.icons}>
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </div>
      <div className={styles.btnWrapper}>
        <Button outlined={true}>{t('ignore')}</Button>
        <Button>{t('follow')}</Button>
      </div>
    </Card>
  )
}
export default RandomFriend
