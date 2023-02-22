import { FC } from 'react'

import Comment from '../Comment'

import styles from './CommentsList.module.scss'
import classNames from 'classnames'
import Loader from '../Loader'

interface CommentsListProps {
  showComments: boolean
  allComments: any
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
        allComments.map(({ comment, user, createdAt }, index) => {
          return (
            <Comment
              key={index}
              authorId={user?.id}
              userName={user?.name}
              comment={comment}
              createdAt={createdAt}
              avatarAuthorComment={user?.avatar}
            />
          )
        })
      )}
    </div>
  )
}

export default CommentsList
