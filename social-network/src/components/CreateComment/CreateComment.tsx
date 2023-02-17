import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC, KeyboardEvent } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'

import styles from './Comment.module.scss'

const Comment: FC = () => {

  const userInfo = useSelector(getUserInfoSelector)

  const { t } = useTranslation()

  const changeComment = (event) => {}

  return (
    <div className={styles.container}>
      <Avatar
        aria-label="recipe"
        src={userInfo?.avatar}
        className={styles.avatar}
      />
      <input
        placeholder={t('comment')}
        className={styles.input}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
          changeComment(event)
        }
      />
    </div>
  )
}

export default Comment
