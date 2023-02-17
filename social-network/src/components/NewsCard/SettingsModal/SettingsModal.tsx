import { DeleteForever, PublishedWithChanges } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../../store/selectors'
import { deletePost, getPost } from '../../../api'
import NewsCreator from '../../NewsCreator'
import Modal from '../../Modal'
import { useOnClickOutside } from '../hooks'

import styles from './SettingsModal.module.scss'

export interface SettingsModalProps {
  id: string
  setIsAllPosts?: (boolean) => void
  setIsSettingModal?: (boolean) => void
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

  useOnClickOutside(modalRef, isChange, () => setIsSettingModal(false))

  const onclickDelete = () => {
    deletePost(id).then(() => setIsAllPosts((prev) => !prev))
  }
  const onclickChange = () => {
    getPost(id).then((response) => {
      setContent(response.data.post.content)
      setImage(response.data.post.image)
      setIsChange(true)
    })
  }

  return (
    <div className={styles.settingsModal} ref={modalRef}>
      <Modal
        className={styles.modal}
        open={isChange}
        onClose={() => setIsChange(false)}
        onConfirm={() => setIsChange(false)}
        isDialogActions={false}
        content={
          <NewsCreator
            name={userInfo?.name}
            avatarImg={userInfo?.avatar}
            content={content}
            id={id}
            setIsAllPosts={setIsAllPosts}
            isChange={true}
            image={image}
          />
        }
      />
      <div onClick={() => onclickChange()}>
        <PublishedWithChanges />
        {t('change')}
      </div>
      <div onClick={() => onclickDelete()}>
        <DeleteForever />
        {t('delete')}
      </div>
    </div>
  )
}

export default SettingsModal
