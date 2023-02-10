import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined'
import MoodIcon from '@mui/icons-material/MoodOutlined'

import { createPost } from '../../api/requests'

import Button from '../Button'
import styles from './NewsCreator.module.scss'


interface NewsCreatorProps {
  name: string
  avatarColor: string
  avatarImg?: string
  setIsAllPosts?: (boolean) => void
}

const NewsCreator: FC<NewsCreatorProps> = ({
  name,
  avatarColor,
  avatarImg,
  setIsAllPosts,
}) => {
  const { t } = useTranslation()

  const [contentInput, setContentInput] = useState('')

  const createNewPost = async () => {
    await createPost({ content: contentInput, username: 'Ula' })
    setContentInput('')
    setIsAllPosts(true)
  }

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
        <ContentInput
          value={contentInput}
          onChange={(event) => setContentInput(event.target.value)}
        />
      </div>
      <div className={styles.createFooter}>
        <CreateIcons />
        <Button onClick={createNewPost}>{t('post')}</Button>
      </div>
    </div>
  )
}

interface ContentInputProps {
  onChange: any
  value: string
}

const ContentInput: FC<ContentInputProps> = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <Box
      component="form"
      className={styles.contentInput}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={value}
        onChange={onChange}
        id="outlined-basic"
        label={t('question')}
        variant="standard"
      />
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
