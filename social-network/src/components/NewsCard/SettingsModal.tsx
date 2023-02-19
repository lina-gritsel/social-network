import { FC, useState, useRef, SetStateAction, Dispatch } from 'react'
import { Delete, PublishedWithChanges as Changes } from '@mui/icons-material'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useOnClickOutside } from '../../hooks'
import CreatePost from '../CreatePost'
import { deletePost, getPost } from '../../api/requests'
import Modal from '../Modal'
import { getUserInfoSelector } from '../../store/selectors'

import styles from './NewsCard.module.scss'

export interface SettingsModalProps {
  id: string
  setIsAllPosts?: Dispatch<SetStateAction<boolean>>
  setIsSettingModal?: Dispatch<SetStateAction<boolean>>
}

const SettingsModal: FC<SettingsModalProps> = ({
  id,
  setIsAllPosts,
  setIsSettingModal,
}) => {
  const [isChange, setIsChange] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const modalRef = useRef()
  const { t } = useTranslation()

  const userInfo = useSelector(getUserInfoSelector)

  useOnClickOutside(modalRef, () => setIsSettingModal(false), isChange)

  const onDeletePost = async () => {
    await deletePost(id)
    setIsAllPosts((prev) => !prev)
  }
  const editPost = async () => {
    const response = await getPost(id)
    setContent(response.data.post.content)
    setImage(response.data.post.image)
    setIsChange(true)
  }

  return (
    <>
      <Modal
        className={styles.modal}
        open={isChange}
        onClose={() => setIsChange(false)}
        onConfirm={() => setIsChange(false)}
        isDialogActions={false}
        content={
          <CreatePost
            name={userInfo?.name}
            userId={userInfo?.id}
            avatarImg={userInfo?.avatar}
            content={content}
            id={id}
            setIsAllPosts={setIsAllPosts}
            image={image}
            className={styles.editInput}
            editMode
          />
        }
      />
      <div className={styles.settingsModal} ref={modalRef}>
        <div onClick={editPost}>
          <Changes />
          {t('change')}
        </div>
        <div onClick={onDeletePost}>
          <Delete />
          {t('delete')}
        </div>
      </div>
    </>
  )
}

export default SettingsModal
