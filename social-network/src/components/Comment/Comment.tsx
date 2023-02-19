import moment from 'moment'
import { FC } from 'react'
import Avatar from '../Avatar'

import styles from './Comment.module.scss'

interface ExistCommentProps {
  comment: string
  userName: string
  createdAt: number
  avatarAuthorComment: string
}

const ExistComment: FC<ExistCommentProps> = ({
  comment,
  userName,
  createdAt,
  avatarAuthorComment,
}) => {
  const createdCommentTime = moment(createdAt).fromNow()

  return (
    <div className={styles.wrapperExistComment}>
      <Avatar imageUrl={avatarAuthorComment} />
      <div className={styles.container}>
        <div className={styles.commentHeader}>
          <div className={styles.name}>{userName}</div>
          <div className={styles.time}>{createdCommentTime}</div>
        </div>
        <div className={styles.content}>{comment}</div>
      </div>
    </div>
  )
}

export default ExistComment
