import React, { FC } from 'react'
import { Favorite, ChatBubbleOutline } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { PATHS } from '../../router/paths'
import Avatar from '../Avatar'

import { useChangeLike } from './hooks'

import styles from './FooterPanelPost.module.scss'

interface FooterPanelPostProps {
  postId: string
  setSchowComments: (value) => void
  allComments: object[]
}

const FooterPanelPost: FC<FooterPanelPostProps> = ({
  postId,
  setSchowComments,
  allComments,
}) => {
  const { isLike, likeOnclick, avatarArr, amountMoreLikes } = useChangeLike({
    postId,
  })
  const { t } = useTranslation()

  const myId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const amountComments = allComments.length

  return (
    <>
      <div className={styles.actionAmount}>
        <div className={styles.avatarWrapper}>
          {avatarArr.map(({ userId, avatar }, index) => (
            <NavLink
              key={index}
              to={`${PATHS.PROFILE}/${userId === myId ? 'me' : userId}`}
              className={styles.likeAvatar}
            >
              <Avatar imageUrl={avatar} className={styles.likeAvatar} />
            </NavLink>
          ))}
          {amountMoreLikes && (
            <div className={styles.likeAvatar}>+{amountMoreLikes}</div>
          )}
        </div>
        <div className={styles.allComments}>
          {amountComments} {t('comments')}
        </div>
      </div>
      <div className={styles.addToPost}>
        <div className={styles.actionOnPost} onClick={likeOnclick}>
          <Favorite
            className={classNames(styles.icon, isLike && styles.isLike)}
          />
          <div className={classNames(styles.like, isLike && styles.isLike)}>
            {t('like')}
          </div>
        </div>
        <div
          className={styles.actionOnPost}
          onClick={() =>
            amountComments && setSchowComments((currentValue) => !currentValue)
          }
        >
          <ChatBubbleOutline className={styles.icon} />
          <div className={styles.like}>{t('comments')}</div>
        </div>
      </div>
    </>
  )
}

export default FooterPanelPost
