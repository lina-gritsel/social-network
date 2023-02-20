import { FC, useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import moment from 'moment'

import { getUser } from '../../api/requests'
import { User } from '../../api'

import { useCreateComment } from '../CreateComment/hooks'
import FooterPanelPost from '../FooterPanelPost'
import CreateComment from '../CreateComment'
import CommentsList from '../CommentsList'
import Avatar from '../Avatar'

import SettingsModal from './SettingsModal'

import styles from './PostCard.module.scss'

export const DEFAULT_IMG =
  'https://bazatoka.ru/image/cache/no_image-800x800.png'

export interface News {
  userId: string
  createdAt: string
  updatedAt?: string
  image?: string
  content: string
  moreContent?: string
  avatarColor?: string
  avatar?: string
  className?: string
  id?: string
  setIsAllPosts?: (value: boolean) => void
  isProfilePage?: boolean
}

const PostCard: FC<News> = ({
  userId,
  createdAt,
  image,
  content,
  avatar,
  className,
  id,
  setIsAllPosts,
  isProfilePage,
}) => {
  const [isSettingModal, setIsSettingModal] = useState(false)
  const [author, setAuthor] = useState<User>()
  const [showMore, setShowMore] = useState(true)
  const [showComments, setSchowComments] = useState(true)

  useEffect(() => {
    const getAuthor = async () => {
      const user = await getUser(userId)
      const authorPost = user.data?.user
      setAuthor(authorPost)
    }
    getAuthor()
  }, [id, userId])

  const createdPostTime = moment(createdAt).fromNow()

  const { isLoading, allComments, onSubmit, onChangeComment, comment } =
    useCreateComment({ postId: id, setSchowComments })

  return (
    <>
      <Card className={classNames(styles.card, className)}>
        {isSettingModal && (
          <SettingsModal
            id={id}
            setIsAllPosts={setIsAllPosts}
            setIsSettingModal={setIsSettingModal}
          />
        )}
        <div className={styles.wrapperCardHeader}>
          <div className={styles.wrapperCard}>
            <Avatar className={styles.cardAvatar} imageUrl={avatar} />
            <div>
              <div className={styles.author}>{author?.name}</div>
              <div className={styles.createAt}>{createdPostTime}</div>
            </div>
          </div>
          {isProfilePage && (
            <IconButton
              aria-label="settings"
              onClick={() => setIsSettingModal((prev) => !prev)}
              className={styles.editPostIcon}
            >
              <MoreVert />
            </IconButton>
          )}
        </div>
        {!!image && (
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={author?.name}
            className={styles.image}
            onError={(e) => ((e.target as HTMLImageElement).src = DEFAULT_IMG)}
          />
        )}
        <CardContent className={styles.cardContent}>
          <Typography
            component={'span'}
            className={styles.content}
            variant="body2"
            color="text.secondary"
          >
            <span
              className={classNames(
                styles.contentText,
                showMore && styles.textTruncate,
              )}
              onClick={() => setShowMore((currentValue) => !currentValue)}
            >
              {content}
            </span>
          </Typography>
        </CardContent>
        <FooterPanelPost
          setSchowComments={setSchowComments}
          allComments={allComments}
        />
        <CreateComment
          onSubmit={onSubmit}
          onChangeComment={onChangeComment}
          comment={comment}
        />
      </Card>
      <CommentsList
        isLoading={isLoading}
        allComments={allComments}
        showComments={showComments}
      />
    </>
  )
}

export default PostCard
