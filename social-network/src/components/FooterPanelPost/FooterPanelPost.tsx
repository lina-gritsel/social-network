import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const amountComments = allComments.length

  return (
    <>
      <div className={styles.allComments}>{amountComments} {t('comments')}</div>
      <div className={styles.addToPost}>
        <div className={styles.actionOnPost}>
          <FavoriteBorder className={styles.icon} />
          <div className={styles.like}>{t('like')}</div>
        </div>
        <div
          className={styles.actionOnPost}
          onClick={() => amountComments && setSchowComments((currentValue) => !currentValue)}
        >
          <ChatBubbleOutline className={styles.icon} />
          <div className={styles.like}>{t('comments')}</div>
        </div>
      </div>
    </>
  )
}

export default FooterPanelPost
