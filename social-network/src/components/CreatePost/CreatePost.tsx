import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import { selectTheme } from '../../store/selectors'
import Modal from '../Modal'
import Avatar from '../Avatar'
import Button from '../Button'
import { useModal } from '../../hooks'

import ModalContent from './components/ModalContent'
import FooterPanel from './components/FooterPanel'
import CreatePostInput from './components/CreatePostInput'
import { useCreatePost } from './hooks'

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
  avatarImg,
  content,
  image,
  setIsAllPosts,
  editMode,
  id,
  userId,
}) => {
  const { t } = useTranslation()
  const theme = useSelector(selectTheme)

  const {
    onSubmit,
    currentImg,
    setCurrentImg,
    contentInput,
    setContentInput,
    onEmojiSelect,
  } = useCreatePost({ content, image, editMode, id, setIsAllPosts, userId })

  const {
    visible: isEmojiModalVisible,
    close: closeEmojiModal,
    open: openEmojiModal,
  } = useModal()

  const {
    visible: isAddImageModalVisible,
    close: closeAddImageModal,
    open: openAddImageModal,
  } = useModal()

  return (
    <div className={styles.create}>
      <Modal
        open={isAddImageModalVisible}
        onClose={closeAddImageModal}
        title={t('addPostImg')}
        className={styles.photo}
        isDialogActions={false}
        content={
          <ModalContent currentImg={currentImg} setCurrentImg={setCurrentImg} />
        }
      />
      <Modal
        open={isEmojiModalVisible}
        onClose={closeEmojiModal}
        isDialogActions={false}
        className={styles.feeling}
        content={
          <Picker
            theme={theme}
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
          className={styles.createPostInput}
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
