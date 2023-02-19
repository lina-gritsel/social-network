import { FC } from 'react'

import { useCreateComment } from '../CreateComment/hooks'
import Comment from '../Comment'

import styles from './CommentsList.module.scss'
import classNames from 'classnames'

interface CommentsListProps {
  postId: string
  showComments: boolean
}

const CommentsList: FC<CommentsListProps> = ({ postId, showComments }) => {
  const { allComments } = useCreateComment(postId)

  return (
    <div className={classNames(styles.list, showComments && styles.show)}>
      {allComments.map(({ comment, user }, index): any => {
        return <Comment key={index} userName={user.name} comment={comment} />
      })}
    </div>
  )
}

export default CommentsList
