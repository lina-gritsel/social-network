import { FC, useState, useRef } from 'react'
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

import classNames from 'classnames'
import { deletePost, getPost } from '../../api/requests'
import { useTranslation } from 'react-i18next'
import NewsCreator from '../NewsCreator'
import { userNews } from '../../pages/NewsPage/NewsPageComponents/userNews'
import Modal from '../Modal'

import { useOnClickOutside } from './hooks'

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
  url?: string
  id?: string
  setIsAllPosts?: (boolean) => void
  isProfilePage?: boolean
}

const NewsCard: FC<News> = ({
  username,
  createdAt,
  image,
  content,
  moreContent,
  avatarColor,
  avatarImg,
  className,
  url,
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
        <SettingsModal id={id} setIsAllPosts={setIsAllPosts} setIsSettingModal={setIsSettingModal}/>
      )}
      {!!avatarColor && (
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: avatarColor }}
              aria-label="recipe"
              alt={username}
              src={avatarImg}
            >
              {username[0]}
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
          title={username}
          subheader={createdAt}
        />
      )}
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
      {!avatarColor && <CardHeader title={username} subheader={createdAt} />}
      <CardContent>
        <Typography
          className={avatarColor ? styles.content : null}
          variant="body2"
          color="text.secondary"
          height={!avatarColor ? 100 : null}
        >
          {content}
        </Typography>
        {!!url && !moreContent && (
          <a target="_blank" rel="noreferrer" href={url}>
            Click to read more 🢅
          </a>
        )}
      </CardContent>
      {!!avatarColor && (
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
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            paragraph
            className={avatarColor ? styles.moreContent : null}
          >
            {moreContent}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export interface SettingsModalProps {
  id: string
  setIsAllPosts?: (boolean) => void
  setIsSettingModal?: (boolean) => void
}

const SettingsModal: FC<SettingsModalProps> = ({ id, setIsAllPosts, setIsSettingModal }) => {
  const [isChange, setIsChange] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const modalRef = useRef();
  const { t } = useTranslation()

  useOnClickOutside(modalRef, isChange, () => setIsSettingModal(false));

  const onclickDelete = () => {
    deletePost(id).then(() => setIsAllPosts((prev) => !prev))
  }
  const onclickChange = () => {
    getPost(id).then((response) => {
      setContent(response.data.post.content)
      setImage(response.data.post.image)
      setIsChange(true)
    })
  }

  return (
    <div className={styles.settingsModal} ref={modalRef}>
      <Modal
        className={styles.modal}
        open={isChange}
        onClose={() => setIsChange(false)}
        onConfirm={() => setIsChange(false)}
        isDialogActions={false}
        content={
          <NewsCreator
            name={userNews[4].username}
            avatarImg={userNews[4].avatarImg}
            content={content}
            id={id}
            setIsAllPosts={setIsAllPosts}
            isChange={true}
            image={image}
          />
        }
      />
      <div onClick={() => onclickChange()}>{t('change')}</div>
      <div onClick={() => onclickDelete()}>{t('delete')}</div>
    </div>
  )
}

export default NewsCard
