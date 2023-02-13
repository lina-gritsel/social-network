import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC, KeyboardEvent } from 'react'
import SendIcon from '@mui/icons-material/Send'

import styles from './Comment.module.scss'

interface CommentProps {
  avatarColor?: string
  avatarImg?: string
}

const Comment: FC<CommentProps> = ({ avatarColor, avatarImg }) => {
  const { t } = useTranslation()

  const changeComment = (event) => {}

  return (
    <div className={styles.container}>
      <Avatar
        sx={{ bgcolor: avatarColor }}
        aria-label="recipe"
        src={avatarImg}
        className={styles.avatar}
      />
      <input
        placeholder={t('comment')}
        className={styles.input}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
          changeComment(event)
        }
      />
      <button className={styles.sendComment}>
        <SendIcon />
      </button>
    </div>
  )
}

export default Comment
