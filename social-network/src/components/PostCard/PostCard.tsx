import { FC, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import moment from 'moment'

import { deletePost, getPost, getUser } from '../../api/requests'
import { getUserInfoSelector } from '../../store/selectors'
import { useOnClickOutside } from '../../hooks'
import { User } from '../../api'

import { useCreateComment } from '../CreateComment/hooks'
import CreateComment from '../CreateComment'
import FooterPanelPost from '../FooterPanelPost'
import CommentsList from '../CommentsList'
import CreatePost from '../CreatePost'
import Avatar from '../Avatar'
import Modal from '../Modal'

import SettingsModal from './SettingsModal'

import styles from './PostCard.module.scss'

export const DEFAULT_IMG =
  'https://bazatoka.ru/image/cache/no_image-800x800.png'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

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
          avatarImg={avatar}
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
