import { FC } from 'react'
import Avatar from '../Avatar'

import styles from './Comment.module.scss'

interface ExistCommentProps {
  comment: string
  userName: string
}

const ExistComment: FC<ExistCommentProps> = ({ comment, userName }) => {
  return (
    <div className={styles.wrapperExistComment}>
      <Avatar imageUrl="" />
      <div className={styles.container}>
        <div className={styles.name}>{userName}</div>
        <div className={styles.time}>{'time'}</div>
        <div className={styles.content}>{comment}</div>
      </div>
    </div>
  )
}

export default ExistComment
