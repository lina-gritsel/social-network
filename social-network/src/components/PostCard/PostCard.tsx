import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment'

import { getUser } from '../../api/requests'
import { getUserInfoSelector } from '../../store/selectors'
import { PATHS } from '../../router/paths'
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
  className,
  id,
  setIsAllPosts,
  isProfilePage,
}) => {
  const [isSettingModal, setIsSettingModal] = useState(false)
  const [author, setAuthor] = useState<User>()
  const [showMore, setShowMore] = useState(true)
  const [showComments, setSchowComments] = useState(false)

  const userInfo = useSelector(getUserInfoSelector)

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
            <NavLink
              className={styles.profileLink}
              to={`${PATHS.PROFILE}/${author?.id}`}
            >
              <Avatar className={styles.cardAvatar} imageUrl={author?.avatar} />
            </NavLink>
            <div>
              <NavLink
                className={styles.profileLink}
                to={`${PATHS.PROFILE}/${author?.id}`}
              >
                <div className={styles.author}>{author?.name}</div>
              </NavLink>
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
          postId={id}
          setSchowComments={setSchowComments}
          allComments={allComments}
        />
        <CreateComment
          onSubmit={() => comment && onSubmit()}
          onChangeComment={onChangeComment}
          comment={comment}
        />
      </Card>
      {showComments && (
        <CommentsList
          isLoading={isLoading}
          allComments={allComments}
        />
      )}
    </>
  )
}

export default PostCard