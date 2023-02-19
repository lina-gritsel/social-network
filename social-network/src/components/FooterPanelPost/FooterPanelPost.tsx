import React, { FC } from 'react'
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'

import styles from './FooterPanelPost.module.scss'

interface FooterPanelPostProps {
  setSchowComments: (value) => void
  allComments: object[]
}

const FooterPanelPost: FC<FooterPanelPostProps> = ({
  setSchowComments,
  allComments,
}) => {
  const amountComments = allComments.length
  return (
    <>
      <div className={styles.allComments}>{`${amountComments} Comments`}</div>
      <div className={styles.addToPost}>
        <div className={styles.actionOnPost}>
          <FavoriteBorder className={styles.icon} />
          <div className={styles.like}>{'Like'}</div>
        </div>
        <div
          className={styles.actionOnPost}
          onClick={() => amountComments && setSchowComments((currentValue) => !currentValue)}
        >
          <ChatBubbleOutline className={styles.icon} />
          <div className={styles.like}>{'Comments'}</div>
        </div>
      </div>
    </>
  )
}

export default FooterPanelPost
