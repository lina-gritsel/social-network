import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import SendIcon from '@mui/icons-material/Send'

import send from '../../assets/icons/send.svg'
import Avatar from '../Avatar'

import styles from './CreateComment.module.scss'
import { useCreateComment } from './hooks'

interface CommentProps {
  avatarImg?: string
  postId: string
}

const CreateComment: FC<CommentProps> = ({ postId, avatarImg }) => {
  const { t } = useTranslation()
  const { comment, onChangeComment, onSubmit, allComments } =
    useCreateComment(postId)

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
          <img src={send}/>
        </button>
      </div>
    </div>
  )
}

export default CreateComment
