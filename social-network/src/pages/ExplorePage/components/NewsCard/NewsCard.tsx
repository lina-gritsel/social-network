import { FC } from 'react'
import classNames from 'classnames'
import {
  CardHeader,
  CardMedia,
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import styles from './NewsCard.module.scss'

export const DEFAULT_IMG =
  'https://bazatoka.ru/image/cache/no_image-800x800.png'

export interface NewsCardProps {
  username: string
  createdAt: string
  image?: string
  content: string
  className?: string
  url?: string
}

export const NewsCard: FC<NewsCardProps> = ({
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
        height={300}
        image={image || DEFAULT_IMG}
        alt={username}
        className={styles.image}
        onError={(e) => ((e.target as HTMLImageElement).src = DEFAULT_IMG)}
      />
      <CardHeader className={styles.username} title={username} subheader={createdAt} />
      <CardContent>
        <Typography className={styles.content} variant="body2" color="text.secondary" height={100}>
          {content}
        </Typography>
        <a target="_blank" rel="noreferrer" href={url}>
          Click to read more 🢅
        </a>
      </CardContent>
    </Card>
  )
}

export default NewsCard
