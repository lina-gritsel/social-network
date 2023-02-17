import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

import styles from './Comment.module.scss'

import { addComment, createListComments } from './hooks'
import ExistComment from './ExistComment'

interface CommentProps {
  avatarImg?: string
  avatarColor?: string
  postId: string
  userName: string
}

const Comment: FC<CommentProps> = ({
  postId,
  userName,
  avatarImg,
  avatarColor,
}) => {
  const { t } = useTranslation()
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const [comment, setComment] = useState<string>('')

  const changeComment = (event) => {
    setComment(event.target.value)
  }

  const createComment = async (userId, comment, postId) => {
    const postComments = await addComment({ userId, comment, postId })

    const author = await createListComments(postComments)
  }

  return (
    <>
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
          onChange={changeComment}
        />
        <button
          className={styles.sendComment}
          onClick={() => createComment(userId, comment, postId)}
        >
          <SendIcon />
        </button>
      </div>
    </>
  )
}

export default Comment
