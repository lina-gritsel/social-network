import {
  FC,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react'
import { styled } from '@mui/material/styles'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
} from '@mui/material'
import {
  MoreVert,
  DeleteIcon,
  PublishedWithChanges,
  DeleteForever,
} from '@mui/icons-material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import moment from 'moment'

import { getUserInfoSelector } from '../../store/selectors'
import { deletePost, getPost, getUser } from '../../api/requests'
import { useOnClickOutside } from '../../hooks'

import CreateComment from '../CreateComment'
import FooterPanelPost from '../FooterPanelPost'
import CreatePost from '../CreatePost'
import Avatar from '../Avatar'
import Modal from '../Modal'

import { User } from '../../api'

import styles from './NewsCard.module.scss'
import CommentsList from '../CommentsList'

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
  username: string
  createdAt: string
  updatedAt?: string
  image?: string
  content: string
  moreContent?: string
  avatarColor?: string
  avatarImg?: string
  className?: string
  id?: string
  setIsAllPosts?: (value: boolean) => void
  isProfilePage?: boolean
}

const NewsCard: FC<News> = ({
  username,
  createdAt,
  image,
  content,
  moreContent,
  avatarImg,
  className,
  id,
  setIsAllPosts,
  isProfilePage,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [isSettingModal, setIsSettingModal] = useState(false)
  const [author, setAuthor] = useState<User>()
  const [showMore, setShowMore] = useState(true)
  const [showComments, setSchowComments] = useState(true)

  useEffect(() => {
    const getAuthor = async () => {
      const user = (await getUser(username)).data.user
      setAuthor(user)
    }
    getAuthor()
  }, [username])

  const createdPostTime = moment(createdAt).fromNow()

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
            <Avatar className={styles.cardAvatar} imageUrl={avatarImg} />
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
            className={styles.content}
            variant="body2"
            color="text.secondary"
          >
            <div
              className={classNames(
                styles.contentText,
                showMore && styles.textTruncate,
              )}
              onClick={() => setShowMore((currentValue) => !currentValue)}
            >
              {content}
            </div>
          </Typography>
        </CardContent>
        <FooterPanelPost setSchowComments={setSchowComments} />
        <CreateComment postId={id} />
      </Card>
      <CommentsList postId={id} showComments={showComments}/>
    </>
  )
}

export interface SettingsModalProps {
  id: string
  setIsAllPosts?: Dispatch<SetStateAction<boolean>>
  setIsSettingModal?: Dispatch<SetStateAction<boolean>>
}

const SettingsModal: FC<SettingsModalProps> = ({
  id,
  setIsAllPosts,
  setIsSettingModal,
}) => {
  const [isChange, setIsChange] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const modalRef = useRef()
  const { t } = useTranslation()

  const userInfo = useSelector(getUserInfoSelector)

  useOnClickOutside(modalRef, () => setIsSettingModal(false), isChange)

  const onDeletePost = async () => {
    await deletePost(id)
    setIsAllPosts((prev) => !prev)
  }

  const editPost = async () => {
    const response = await getPost(id)
    setContent(response.data.post.content)
    setImage(response.data.post.image)
    setIsChange(true)
  }

  return (
    <>
      <Modal
        className={styles.modal}
        open={isChange}
        onClose={() => setIsChange(false)}
        onConfirm={() => setIsChange(false)}
        isDialogActions={false}
        ref={modalRef}
        content={
          <CreatePost
            name={userInfo?.name}
            userId={userInfo?.id}
            avatarImg={userInfo?.avatar}
            content={content}
            id={id}
            setIsAllPosts={setIsAllPosts}
            image={image}
            editMode
          />
        }
      />
      <div className={styles.settingsModal} ref={modalRef}>
        <div onClick={editPost}>
          <PublishedWithChanges />
          {t('change')}
        </div>
        <div onClick={onDeletePost}>
          <DeleteForever />
          {t('delete')}
        </div>
      </div>
    </>
  )
}

export default NewsCard
