import { FC, useState, SetStateAction, Dispatch } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined'
import MoodIcon from '@mui/icons-material/MoodOutlined'

import Button from '../Button'
import { changePost, createPost } from '../../api/requests'
import Modal from '../Modal'

import { ModalContent } from './ModalContent'

import styles from './NewsCreator.module.scss'

interface NewsCreatorProps {
  name: string
  userId: string
  avatarImg?: string
  content?: string
  image?: string
  id?: string
  isChange?: boolean
  setIsAllPosts?: Dispatch<SetStateAction<boolean>>
}

interface ContentInputProps {
  onChange: any
  value: string
}

const NewsCreator: FC<NewsCreatorProps> = ({
  name,
  userId,
  avatarImg,
  content,
  image,
  setIsAllPosts,
  isChange,
  id,
}) => {
  const { t } = useTranslation()

  const [contentInput, setContentInput] = useState(content || '')
  const [isOpenImg, setIsOpenImg] = useState<boolean>(false)
  const [isOpenFeeling, setIsOpenFeeling] = useState<boolean>(false)
  const [currentImg, setCurrentImg] = useState<string>(image || '')

  const createNewPost = async () => {
    isChange
      ? await changePost({ content: contentInput, image: currentImg }, id)
      : await createPost({
          content: contentInput,
          username: userId,
          image: currentImg,
        })
    setContentInput('')
    setCurrentImg('')
    setIsAllPosts((prev) => !prev)
  }

  const onEmojiSelect = (e) => {
    setContentInput((prev) => prev + e.native)
  }

  return (
    <div className={styles.create}>
      <Modal
        open={isOpenImg}
        onClose={() => setIsOpenImg(false)}
        onConfirm={() => setIsOpenImg(false)}
        title={t('addPostImg')}
        className={isChange ? styles.photo : null}
        isDialogActions={false}
        content={
          <ModalContent currentImg={currentImg} setCurrentImg={setCurrentImg} />
        }
      />
      <Modal
        open={isOpenFeeling}
        onClose={() => setIsOpenFeeling(false)}
        onConfirm={() => setIsOpenFeeling(false)}
        isDialogActions={false}
        className={isChange ? styles.feeling : null}
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
          aria-label="recipe"
          src={avatarImg}
          className={styles.avatar}
        >
          {name}
        </Avatar>
        <ContentInput
          value={contentInput}
          onChange={(event) => setContentInput(event.target.value)}
        />
      </div>
      {currentImg ? (
        <img className={styles.createImg} src={currentImg}></img>
      ) : null}
      <div className={styles.createFooter}>
        <CreateIcons
          setIsOpenImg={setIsOpenImg}
          setIsOpenFeeling={setIsOpenFeeling}
        />
        <Button
          isDisabled={!contentInput && !currentImg}
          onClick={createNewPost}
        >
          {t('post')}
        </Button>
      </div>
    </div>
  )
}

const ContentInput: FC<ContentInputProps> = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.contentInput}>
      <TextField
        className={styles.textField}
        id="outlined-basic"
        variant="outlined"
        sx={{
          '& fieldset': { border: 'none' },
        }}
        value={value}
        onChange={onChange}
        label={t('question')}
      />
    </div>
  )
}

interface CreateIconsProps {
  setIsOpenImg: any
  setIsOpenFeeling: any
}

const CreateIcons: FC<CreateIconsProps> = ({
  setIsOpenImg,
  setIsOpenFeeling,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.createIcons}>
      <div className={styles.createItem} onClick={() => setIsOpenImg(true)}>
        <PhotoIcon fontSize="medium" className={styles.icon} />
        <p>
          {t('photo')} / {t('video')}
        </p>
      </div>
      <div className={styles.createItem} onClick={() => setIsOpenFeeling(true)}>
        <MoodIcon fontSize="medium" className={styles.icon} />
        <p>{t('feeling')}</p>
      </div>
    </div>
  )
}

export default NewsCreator
