import { Avatar } from '@mui/material'
import { FC } from 'react'

import styles from './ExistComment.module.scss'

const ExistComment: FC = () => {
  return (
    <div className={styles.wrapperExistComment}>
      <Avatar className={styles.avatar} />
      <div className={styles.container}>
        <div className={styles.name}>{'Name'}</div>
        <div className={styles.time}>{'time'}</div>
        <div className={styles.content}>
          {'CommentComment CommentComment  CommentCommentComment'}
        </div>
      </div>
    </div>
  )
}

export default ExistComment
