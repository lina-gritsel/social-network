import { styled } from '@mui/material/styles'
import { FC, useState } from 'react'
import classNames from 'classnames'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
} from '@mui/material'
import {
  FavoriteBorder,
  MoreVert,
  ChatBubbleOutline,
} from '@mui/icons-material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Comment from '../../components/Comment'

import styles from './NewsCard.module.scss'
import SettingsModal from './SettingsModal'

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
        <SettingsModal
          id={id}
          setIsAllPosts={setIsAllPosts}
          setIsSettingModal={setIsSettingModal}
        />
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
                <MoreVert />
              </IconButton>
            ) : null
          }
          title={username}
          subheader={createdAt}
          className={styles.cardHeader}
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
      <CardContent className={styles.content}>
        <Typography
          className={styles.content}
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
        <div className={styles.footerPost}>
          <CardActions disableSpacing className={styles.cardActions}>
            <div className={styles.addToPost}>
              <div className={styles.actionOnPost}>
                <FavoriteBorder className={styles.icon} />
                <div className={styles.like}>{'Like'}</div>
              </div>
              <div className={styles.actionOnPost}>
                <ChatBubbleOutline className={styles.icon} />
                <div className={styles.like}>{'Comments'}</div>
              </div>
            </div>
            {!!moreContent && (
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                className={styles.expandMore}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            )}
          </CardActions>
          <Comment postId={id} userName={username} />
        </div>
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

export default NewsCard
