import { FC, useState, useRef, SetStateAction, Dispatch } from 'react'
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
  FavoriteBorder,
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

import { getUserInfoSelector } from '../../store/selectors'
import { deletePost, getPost } from '../../api/requests'
import { useOnClickOutside } from '../../hooks'

import CreateComment from '../CreateComment'
import CreatePost from '../CreatePost'
import Avatar from '../Avatar'
import Modal from '../Modal'

import styles from './NewsCard.module.scss'
import FooterPanelPost from '../FooterPanelPost'

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
        avatar={<Avatar imageUrl={avatarImg} />}
        action={
          isProfilePage ? (
            <IconButton
              aria-label="settings"
              onClick={() => setIsSettingModal((prev) => !prev)}
            >
              <MoreVert />
            </IconButton>
          ) : null
        }
        title={username}
        subheader={createdAt}
      />
      {!!image && (
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={username}
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
      <FooterPanelPost/>
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
      <CreateComment postId={id} />
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

  useOnClickOutside(modalRef, () => setIsSettingModal(false))

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
    <div className={styles.settingsModal}>
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
            avatarImg={userInfo?.avatar}
            content={content}
            id={id}
            setIsAllPosts={setIsAllPosts}
            image={image}
            editMode
          />
        }
      />
      <div onClick={editPost}>
        <PublishedWithChanges />
        {t('change')}
      </div>
      <div onClick={onDeletePost}>
        <DeleteForever />
        {t('delete')}
      </div>
    </div>
  )
}

export default NewsCard
