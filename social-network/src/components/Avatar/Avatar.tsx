import { FC } from 'react'
import { Avatar as AvatarMui } from '@mui/material'
import classNames from 'classnames'

import styles from './Avatar.module.scss'

interface AvatarProps {
  imageUrl?: string
  className?: string
  onClick?: () => void
}

const Avatar: FC<AvatarProps> = ({ imageUrl, className, onClick }) => {
  return (
    <AvatarMui
      src={imageUrl}
      onClick={onClick}
      aria-label="recipe"
      className={classNames(styles.root, className)}
      alt="avatar"
    />
  )
}

export default Avatar
