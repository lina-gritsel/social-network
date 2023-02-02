import * as React from 'react'
import {FC} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined'
import MoodIcon from '@mui/icons-material/MoodOutlined';

import styles from './NewsCreator.module.scss'
import Button from '../Button'

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
        <Button>Post</Button>
      </div>
    </div>
  )
}

function ContentInput() {
  return (
    <Box
      component="form"
      className={styles.contentInput}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Whats happening?"
        variant="standard"
      />
    </Box>
  )
}

const CreateIcons: FC = () => {
  return (
    <div className={styles.createIcons}>
      <div className={styles.createItem}>
        <PhotoIcon fontSize="medium" sx={{ color: '--gray-color' }} />
        <p>Photo / Video</p>
      </div>
      <div className={styles.createItem}>
        <MoodIcon fontSize="medium" sx={{ color: '--gray-color' }} />
        <p>Feeling</p>
      </div>
    </div>
  )
}
export default NewsCreator
