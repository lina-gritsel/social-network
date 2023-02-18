import {
  FC,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChangesIcon from '@mui/icons-material/PublishedWithChanges'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import Comment from '../../components/Comment'
import { useOnClickOutside } from '../../hooks'
import CreatePost from '../CreatePost'
import { deletePost, getPost, getUser } from '../../api/requests'
import Modal from '../Modal'
import { getUserInfoSelector } from '../../store/selectors'
import { User } from '../../api'

import styles from './NewsCard.module.scss'

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
  avatarColor,
  className,
  id,
  setIsAllPosts,
  isProfilePage,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [isSettingModal, setIsSettingModal] = useState(false)
  const [author, setAuthor] = useState<User>()

  useEffect(() => {
    const getAuthor = async () => {
      const user = (await getUser(username)).data.user
      setAuthor(user)
    }
    getAuthor()
  }, [username])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classNames(styles.card, className)}>
      {isSettingModal && (
        <SettingsModal
          id={id}
          setIsAllPosts={setIsAllPosts}
          setIsSettingModal={setIsSettingModal}
        />
      )}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: avatarColor }}
            aria-label="recipe"
            alt={author?.name}
            src={author?.avatar}
          >
            {author?.name[0]}
          </Avatar>
        }
        action={
          isProfilePage ? (
            <IconButton
              aria-label="settings"
              onClick={() => setIsSettingModal((prev) => !prev)}
            >
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={author?.name}
        subheader={createdAt}
      />
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
      <CardContent>
        <Typography
          className={styles.content}
          variant="body2"
          color="text.secondary"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {!!moreContent && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className={styles.moreContent}>
            {moreContent}
          </Typography>
        </CardContent>
      </Collapse>
      <Comment />
    </Card>
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
          <ChangesIcon />
          {t('change')}
        </div>
        <div onClick={onDeletePost}>
          <DeleteIcon />
          {t('delete')}
        </div>
      </div>
    </>
  )
}

export default NewsCard
