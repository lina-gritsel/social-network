import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

import { PATHS } from '../../router/paths'
import { getUser } from '../../api'

import Avatar from '../Avatar'

import styles from './Comment.module.scss'

interface ExistCommentProps {
  comment: string
  createAt: number
  author: any
}

const ExistComment: FC<ExistCommentProps> = ({
  comment,
  createAt,
  author,
}) => {
  const createdCommentTime = moment(createAt).fromNow()
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
      <NavLink to={`${PATHS.PROFILE}/${authorComment?.id}`}>
        <Avatar imageUrl={authorComment?.avatar} />
      </NavLink>
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
