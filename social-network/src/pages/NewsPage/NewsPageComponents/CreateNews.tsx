import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined';
import { grey } from '@mui/material/colors'

import styles from '../NewsPage.module.scss'


interface NewsCreatorProps {
  name: string
  avatarColor: string
  avatarImg?: string
}

const NewsCreator: React.FC<NewsCreatorProps> = ({
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
        <PhotoIcon fontSize="large" sx={{ color: grey[700] }}/>
      
      </div>
    </div>
  )
}

function ContentInput() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '65ch', bgcolor: grey[100] },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Whats happening?"
        variant="outlined"
      />
    </Box>
  )
}

export default NewsCreator
