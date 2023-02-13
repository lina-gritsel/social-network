import { FC, useState } from 'react'
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

import Comment from '../../components/Comment'

import classNames from 'classnames'

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
  name: string
  img?: string
  content: string
  moreContent?: string
  avatarColor?: string
  avatarImg?: string
  className?: string
  url?: string
  createdAt: string
}

const NewsCard: FC<News> = ({
  name,
  createdAt,
  img,
  content,
  moreContent,
  avatarColor,
  avatarImg,
  className,
  url,
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classNames(styles.card, className)}>
      {!!avatarColor && (
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: avatarColor }}
              aria-label="recipe"
              alt={name}
              src={avatarImg}
            >
              {name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={createdAt}
        />
      )}
      {!!img && (
        <CardMedia
          component="img"
          height="300"
          image={img}
          alt={name}
          className={styles.image}
          onError={(e) => ((e.target as HTMLImageElement).src = DEFAULT_IMG)}
        />
      )}
      {!avatarColor && <CardHeader title={name} subheader={createdAt} />}
      <CardContent>
        <Typography
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
        <>
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
          <Comment />
        </>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{moreContent}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default NewsCard
