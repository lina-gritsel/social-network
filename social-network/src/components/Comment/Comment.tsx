import { FC } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

import { PATHS } from '../../router/paths'

import Avatar from '../Avatar'

import styles from './Comment.module.scss'

interface ExistCommentProps {
  comment: string
  userName: string
  createdAt: number
  avatarAuthorComment: string
  authorId: string
}

const ExistComment: FC<ExistCommentProps> = ({
  comment,
  authorId,
  userName,
  createdAt,
  avatarAuthorComment,
}) => {
  const createdCommentTime = moment(createdAt).fromNow()

  return (
    <div className={styles.wrapperExistComment}>
      <NavLink to={`${PATHS.PROFILE}/${authorId}`}>
        <Avatar imageUrl={avatarAuthorComment} />
      </NavLink>
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
