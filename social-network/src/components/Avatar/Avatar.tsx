import { FC } from 'react'
import { Avatar as AvatarMui } from '@mui/material'
import classNames from 'classnames'

import styles from './Avatar.module.scss'

interface AvatarProps {
  imageUrl?: string
  className?: string
  onClick?: () => void
  title?: string
}

const Avatar: FC<AvatarProps> = ({ imageUrl, className, onClick, title }) => {
  return (
    <AvatarMui
      src={imageUrl}
      onClick={onClick}
      aria-label="recipe"
      className={classNames(styles.root, className)}
      alt="avatar"
    >
      {title}
    </AvatarMui>
  )
}

export default Avatar
