import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import Modal from '../Modal'
import Avatar from '../Avatar'
import Button from '../Button'
import ModalContent from './components/ModalContent'
import FooterPanel from './components/FooterPanel'
import CreatePostInput from './components/CreatePostInput'
import { useAddImageModal, useCreatePost, useEmojiModal } from './hooks'

import styles from './CreatePost.module.scss'

interface CreatePostProps {
  name: string
  avatarImg?: string
  content?: string
  image?: string
  className?: string
  id?: string
  userId?: string
  editMode?: boolean
  setIsAllPosts?: Dispatch<SetStateAction<boolean>>
}

const CreatePost: FC<CreatePostProps> = ({
  name,
  avatarImg,
  content,
  image,
  setIsAllPosts,
  editMode,
  id,
  userId,
  className,
}) => {
  const { t } = useTranslation()

  const {
    onSubmit,
    currentImg,
    setCurrentImg,
    contentInput,
    setContentInput,
    onEmojiSelect,
  } = useCreatePost({ content, image, editMode, id, setIsAllPosts, userId })

  const {
    isVisible: isEmojiModalVisible,
    close: closeEmojiModal,
    open: openEmojiModal,
  } = useEmojiModal()

  const {
    isVisible: isAddImageModalVisible,
    close: closeAddImageModal,
    open: openAddImageModal,
  } = useAddImageModal()

  return (
    <div className={styles.create}>
      <Modal
        open={isAddImageModalVisible}
        onClose={closeAddImageModal}
        title={t('addPostImg')}
        className={editMode ? styles.photo : ''}
        isDialogActions={false}
        content={
          <ModalContent currentImg={currentImg} setCurrentImg={setCurrentImg} />
        }
      />
      <Modal
        open={isEmojiModalVisible}
        onClose={closeEmojiModal}
        isDialogActions={false}
        className={editMode ? styles.feeling : ''}
        content={
          <Picker
            theme="light"
            data={data}
            onEmojiSelect={(e) => onEmojiSelect(e)}
          />
        }
      />

      <div className={styles.createHeader}>
        <Avatar imageUrl={avatarImg} className={styles.avatar} />
        <CreatePostInput
          value={contentInput}
          onChange={(event) => setContentInput(event.target.value)}
          className={className}
        />
      </div>
      {currentImg && <img className={styles.createImg} src={currentImg} />}
      <div className={styles.createFooter}>
        <FooterPanel
          openAddImageModal={openAddImageModal}
          openEmojiModal={openEmojiModal}
        />
        <Button
          className={
            !contentInput && !currentImg
              ? styles.createPost
              : styles.createPostActive
          }
          isDisabled={!contentInput && !currentImg}
          onClick={onSubmit}
        >
          {t('post')}
        </Button>
      </div>
    </div>
  )
}

export default CreatePost
