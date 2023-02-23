import { FC } from 'react'

import Comment from '../Comment'
import Loader from '../Loader'

import styles from './CommentsList.module.scss'

interface CommentsListProps {
  allComments: any[]
  isLoading: boolean
}

const CommentsList: FC<CommentsListProps> = ({ allComments, isLoading }) => {
  return (
    <div className={styles.list}>
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
