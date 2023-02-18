import React, { FC } from 'react'
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'

import styles from './FooterPanelPost.module.scss'

const FooterPanelPost: FC = () => {

  return (
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
  )
}

export default FooterPanelPost
