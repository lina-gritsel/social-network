import { Avatar } from '@mui/material'
import { FC } from 'react'

import styles from './ExistComment.module.scss'

interface ExistCommentProps {
  comment: string
}

const ExistComment: FC<ExistCommentProps> = ({comment}) => {
  return (
    <div className={styles.wrapperExistComment}>
      <Avatar className={styles.avatar} />
      <div className={styles.container}>
        <div className={styles.name}>{'Name'}</div>
        <div className={styles.time}>{'time'}</div>
        <div className={styles.content}>{comment}</div>
      </div>
    </div>
  )
}

export default ExistComment
