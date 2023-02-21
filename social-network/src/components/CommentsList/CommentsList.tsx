import { FC } from 'react'
import classNames from 'classnames'

import Comment from '../Comment'
import Loader from '../Loader'

import styles from './CommentsList.module.scss'

interface CommentsListProps {
  showComments: boolean
  allComments: any[]
  isLoading: boolean
}

const CommentsList: FC<CommentsListProps> = ({
  allComments,
  showComments,
  isLoading,
}) => {
  return (
    <div className={classNames(styles.list, { [styles.show]: showComments })}>
      {isLoading ? (
        <Loader />
      ) : (
        allComments.map(({ comment, user, createAt }, index) => {
          return (
            <Comment
              key={index}
              author={user}
              comment={comment}
              createAt={createAt}
            />
          )
        })
      )}
    </div>
  )
}

export default CommentsList
