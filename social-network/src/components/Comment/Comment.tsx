import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

import styles from './Comment.module.scss'

import { addComment } from './hooks'
// import CommentsList from './CommentsList'
import { getUser } from '../../api'
import ExistComment from './ExistComment'

interface CommentProps {
  avatarImg?: string
  avatarColor?: string
  postId: string
  userName: string
}

const Comment: FC<CommentProps> = ({ postId, avatarImg, avatarColor }) => {
  const { t } = useTranslation()
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
  // const userInfo = useSelector(getUserInfoSelector)
  const [comment, setComment] = useState<string>('')
  const [allComment, setAllComment] = useState([])
  const [authorsPosts, setAuthorsPosts] = useState([])

  const changeComment = (event) => {
    setComment(event.target.value)
  }

  const createComment = async (userId, comment, postId) => {
    const postComments = await addComment({ userId, comment, postId })
    setAllComment(postComments)
    setComment('')
  }

  useEffect(() => {
    allComment.map(async (comment) => {
      const author = await getUser(comment.userId)
      setAuthorsPosts((prev) => [...prev, author.data.user.name])
    })
  }, [allComment])

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
          value={comment}
        />
        <button
          className={styles.sendComment}
          onClick={() => createComment(userId, comment, postId)}
        >
          <SendIcon />
        </button>
      </div>
      {allComment.map((comment) => {
        authorsPosts.map((author, index) => {
          return (
            <ExistComment key={index} userName={author} comment={comment} />
          )
        })
      })}
    </>
  )
}

export default Comment
