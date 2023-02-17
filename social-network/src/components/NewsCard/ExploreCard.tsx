import { FC } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import classNames from 'classnames'

import styles from './NewsCard.module.scss'

export const DEFAULT_IMG =
  'https://bazatoka.ru/image/cache/no_image-800x800.png'

export interface ExploreNews {
  username: string
  createdAt: string
  image?: string
  content: string
  className?: string
  url?: string
}

export const ExploreNewsCard: FC<ExploreNews> = ({
  username,
  createdAt,
  image,
  content,
  className,
  url,
}) => {
  return (
    <Card className={classNames(styles.card, className)}>
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={username}
        className={styles.image}
        onError={(e) => ((e.target as HTMLImageElement).src = DEFAULT_IMG)}
      />
      <CardHeader title={username} subheader={createdAt} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" height={100}>
          {content}
        </Typography>
        <a target="_blank" rel="noreferrer" href={url}>
          Click to read more 🢅
        </a>
      </CardContent>
    </Card>
  )
}


