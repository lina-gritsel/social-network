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
  const { t } = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.friends}>
        <div>You Might Like</div>
        {friends.map((friend, index) =>
          index % 4 === 0 ? <Friend key={index} {...friend} /> : null,
        )}
      </div>
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
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: avatarColor }}
            aria-label="recipe"
            alt={name}
            src={avatarImg}
          >
            {name[0]}
          </Avatar>
        }
        title={name}
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
