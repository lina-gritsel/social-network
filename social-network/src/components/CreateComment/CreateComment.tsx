import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import sendIcon from '../../assets/icons/send.svg'
import Avatar from '../Avatar'

import styles from './CreateComment.module.scss'

interface CommentProps {
  avatarImg?: string
  onSubmit: any
  onChangeComment
  comment
}

const CreateComment: FC<CommentProps> = ({
  avatarImg,
  onSubmit,
  onChangeComment,
  comment,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar imageUrl={avatarImg} className={styles.avatar} />
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
