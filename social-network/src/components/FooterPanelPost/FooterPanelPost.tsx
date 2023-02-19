import React, { FC } from 'react'
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'

import styles from './FooterPanelPost.module.scss'

interface FooterPanelPostProps {
  setSchowComments: (value) => void
}

const FooterPanelPost: FC<FooterPanelPostProps> = ({ setSchowComments }) => {
  return (
    <div className={styles.addToPost}>
      <div className={styles.actionOnPost}>
        <FavoriteBorder className={styles.icon} />
        <div className={styles.like}>{'Like'}</div>
      </div>
      <div
        className={styles.actionOnPost}
        onClick={() => setSchowComments((currentValue) => !currentValue)}
      >
        <ChatBubbleOutline className={styles.icon} />
        <div className={styles.like}>{'Comments'}</div>
      </div>
    </div>
  )
}

export default FooterPanelPost
