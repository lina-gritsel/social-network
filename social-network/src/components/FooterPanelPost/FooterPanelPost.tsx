import React, { FC } from 'react'
import { Favorite, ChatBubbleOutline } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import Avatar from '../Avatar'
import Loader from '../Loader'

import { useChangeLike } from './hooks'

import styles from './FooterPanelPost.module.scss'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../../router/paths'

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
  const {
    isLike,
    likeOnclick,
    avatarArr,
    amountMoreLikes,
    isLoading,
    likesUsersId,
  } = useChangeLike({
    postId,
  })
  const { t } = useTranslation()
  const amountComments = allComments.length

  return (
    <>
      <div className={styles.actionAmount}>
        <div className={styles.avatarWrapper}>
          {isLoading ? (
            <Loader className={styles.loading} />
          ) : (
            <>
              {avatarArr.map((avatar, index) => (
                <NavLink
                  key={index}
                  to={`${PATHS.PROFILE}/${likesUsersId[index]}`}
                  className={styles.likeAvatar}
                >
                  <Avatar imageUrl={avatar} className={styles.likeAvatar} />
                </NavLink>
              ))}
              {amountMoreLikes && (
                <Avatar
                  className={styles.likeAvatar}
                  title={`+${amountMoreLikes}`}
                />
              )}
            </>
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
