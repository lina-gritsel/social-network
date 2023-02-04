import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined'
import MoodIcon from '@mui/icons-material/MoodOutlined'

import Button from '../Button'

import styles from './NewsCreator.module.scss'

interface NewsCreatorProps {
  name: string
  avatarColor: string
  avatarImg?: string
}

const NewsCreator: FC<NewsCreatorProps> = ({
  name,
  avatarColor,
  avatarImg,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.create}>
      <div className={styles.createHeader}>
        <Avatar
          sx={{ bgcolor: avatarColor }}
          aria-label="recipe"
          src={avatarImg}
        >
          {name[0]}
        </Avatar>
        <ContentInput />
      </div>
      <div className={styles.createFooter}>
        <CreateIcons />
        <Button>{t('post')}</Button>
      </div>
    </div>
  )
}

const ContentInput = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="form"
      className={styles.contentInput}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={t('question')} variant="standard" />
    </Box>
  )
}

const CreateIcons: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.createIcons}>
      <div className={styles.createItem}>
        <PhotoIcon fontSize="medium" className={styles.icon} />
        <p>
          {t('photo')} / {t('video')}
        </p>
      </div>
      <div className={styles.createItem}>
        <MoodIcon fontSize="medium" className={styles.icon} />
        <p>{t('feeling')}</p>
      </div>
    </div>
  )
}
export default NewsCreator
