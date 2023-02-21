import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { getUser } from '../../api'
import Avatar from '../Avatar'

import styles from './Comment.module.scss'

interface ExistCommentProps {
  comment: string
  createdAt: number
  author: any
}

const ExistComment: FC<ExistCommentProps> = ({
  comment,
  createdAt,
  author,
}) => {
  const createdCommentTime = moment(createdAt).fromNow()
  const [authorComment, setAuthorComment] = useState(null)

  useEffect(() => {
    const getAuthorComment = async () => {
      const authorInfo = await getUser(author.id)
      setAuthorComment(authorInfo?.data?.user)
    }
    getAuthorComment()
  }, [author])

  return (
    <div className={styles.wrapperExistComment}>
      <Avatar imageUrl={authorComment?.avatar} />
      <div className={styles.container}>
        <div className={styles.commentHeader}>
          <div className={styles.name}>{authorComment?.name} </div>
          <div className={styles.time}>{createdCommentTime}</div>
        </div>
        <div className={styles.content}>{comment}</div>
      </div>
    </div>
  )
}

export default ExistComment
