import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC, KeyboardEvent, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

import styles from './Comment.module.scss'

import { addComment } from './hooks'
import ExistComment from './ExistComments'

interface CommentProps {
  avatarImg?: string
  avatarColor?: string
  postId: string
}

const Comment: FC<CommentProps> = ({ postId, avatarImg, avatarColor }) => {
  const { t } = useTranslation()
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const [comment, setComment] = useState<string>('')
  const [postComments, setPostComments] = useState([])

  const changeComment = (event) => {
    setComment(event.target.value)
  }

  const createComment = async (userId, comment, postId) => {
    const result = await addComment({ userId, comment, postId })
    console.log(result.comments)

    const allComments = result.comments
    setPostComments(allComments)
  }

  const commentsList = (postComments) => {
    if (postComments) {
      postComments.map((comment, index) => {
        return <ExistComment key={index} comment={comment.comment} />
      })
    }
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
      {postComments.map((comment, index) => {
        return <ExistComment key={index} comment={comment.comment} />
      })}
    </>
  )
}

export default Comment
