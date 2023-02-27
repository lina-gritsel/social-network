import { FC, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { MoodOutlined } from '@mui/icons-material'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import sendIcon from '../../assets/icons/send.svg'
import { getUserInfoSelector, selectTheme } from '../../store/selectors'
import { pressEnter } from '../../utils'
import { useModal } from '../../hooks'
import Avatar from '../Avatar'
import Modal from '../Modal'

import styles from './CreateComment.module.scss'

interface CommentProps {
  onSubmit: () => void
  onChangeComment: (event) => void
  onEmojiSelect: (event) => void
  comment: string
}

const CreateComment: FC<CommentProps> = ({
  onSubmit,
  onChangeComment,
  onEmojiSelect,
  comment,
}) => {
  const { t } = useTranslation()
  const userInfo = useSelector(getUserInfoSelector)
  const theme = useSelector(selectTheme)

  const { visible, open, close } = useModal()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar imageUrl={userInfo?.avatar} className={styles.avatar} />
        <input
          placeholder={t('comment')}
          className={styles.input}
          onChange={onChangeComment}
          value={comment}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            pressEnter(e, onSubmit)
          }
        />
        <MoodOutlined className={styles.feeling} onClick={() => open()} />
        <button className={styles.sendComment} onClick={onSubmit}>
          <img src={sendIcon} />
        </button>
      </div>
      <Modal
        open={visible}
        onClose={close}
        isDialogActions={false}
        className={styles.feelingModal}
        content={
          <Picker
            theme={theme}
            data={data}
            onEmojiSelect={(e) => onEmojiSelect(e)}
          />
        }
      />
    </div>
  )
}

export default CreateComment
