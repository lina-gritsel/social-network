import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Picker from '@emoji-mart/react'
import { Avatar } from '@mui/material'
import data from '@emoji-mart/data'

import Button from '../Button'
import Modal from '../Modal'

import { ModalContent } from '../NewsCreator/ModalContent'
import CreatePostInput from './components/CreatePostInput'
import { useCreatePost, useEmojiModal } from './hooks'
import FooterPanel from './components/FooterPanel'

import styles from './CreatePost.module.scss'


interface CreatePostProps {
  name: string
  avatarImg?: string
  content?: string
  image?: string
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
  } = useEmojiModal()

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
        <Avatar
          sx={{ bgcolor: '#377dff' }}
          aria-label="recipe"
          src={avatarImg}
          className={styles.avatar}
        >
          {name}
        </Avatar>
        <CreatePostInput
          value={contentInput}
          onChange={(event) => setContentInput(event.target.value)}
        />
      </div>
      {currentImg && <img className={styles.createImg} src={currentImg} />}
      <div className={styles.createFooter}>
        <FooterPanel
          openAddImageModal={openAddImageModal}
          openEmojiModal={openEmojiModal}
        />
        <Button isDisabled={!contentInput && !currentImg} onClick={onSubmit}>
          {t('post')}
        </Button>
      </div>
    </div>
  )
}

export default CreatePost