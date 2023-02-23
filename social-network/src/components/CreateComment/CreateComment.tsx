import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import sendIcon from '../../assets/icons/send.svg'
import { getUserInfoSelector } from '../../store/selectors'
import Avatar from '../Avatar'

import styles from './CreateComment.module.scss'

interface CommentProps {
  onSubmit: () => void
  onChangeComment: (event) => void
  comment: string
}

const CreateComment: FC<CommentProps> = ({
  onSubmit,
  onChangeComment,
  comment,
}) => {
  const { t } = useTranslation()
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar imageUrl={userInfo?.avatar} className={styles.avatar} />
        <input
          placeholder={t('comment')}
          className={styles.input}
          onChange={onChangeComment}
          value={comment}
        />
        <button className={styles.sendComment} onClick={onSubmit}>
          <img src={sendIcon} />
        </button>
      </div>
    </div>
  )
}

export default CreateComment