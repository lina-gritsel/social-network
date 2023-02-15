import { FC, useRef, useState, SyntheticEvent } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/InsertPhotoOutlined'
import MoodIcon from '@mui/icons-material/MoodOutlined'
import CancelIcon from '@mui/icons-material/CancelOutlined'

import Button from '../Button'
import { changePost, createPost } from '../../api/request'
import Modal from '../Modal'

import styles from './NewsCreator.module.scss'

interface NewsCreatorProps {
  name: string
  avatarColor: string
  avatarImg?: string
  content?: string
  id?: string
  isChange?: boolean
  setIsAllPosts?: (boolean) => void
}

const NewsCreator: FC<NewsCreatorProps> = ({
  name,
  avatarColor,
  avatarImg,
  content,
  setIsAllPosts,
  isChange,
  id,
}) => {
  const { t } = useTranslation()

  const [contentInput, setContentInput] = useState(content || '')
  const [isOpenImg, setIsOpenImg] = useState<boolean>(false)
  const [isOpenFeeling, setIsOpenFeeling] = useState<boolean>(false)
  const [currentImg, setCurrentImg] = useState<string>('')

  const createNewPost = async () => {
    isChange
      ? await changePost(contentInput, id)
      : await createPost({ content: contentInput, username: 'Alina' })
    setContentInput('')
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
        className={styles.feeling}
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
          sx={{ bgcolor: avatarColor }}
          aria-label="recipe"
          src={avatarImg}
          className={styles.avatar}
        >
          {name[0]}
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
        <Button onClick={createNewPost}>{t('post')}</Button>
      </div>
    </div>
  )
}

interface ContentInputProps {
  onChange: any
  value: string
}

const ContentInput: FC<ContentInputProps> = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <Box
      component="form"
      className={styles.contentInput}
      noValidate
      autoComplete="off"
    >
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
    </Box>
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

interface ModalContentProps {
  setCurrentImg: any
  currentImg: string
}

const ModalContent: FC<ModalContentProps> = ({ currentImg, setCurrentImg }) => {
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [isAddImg, setIsAddImg] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>()
  const { t } = useTranslation()

  const onChangeInput = () => {
    setIsErrorImg(false)
    setIsAddImg(false)
    inputRef.current.value.trim() === ''
      ? setIsDisabled(true)
      : setIsDisabled(false)
  }

  const handleClickBtn = () => {
    const newImg = inputRef.current.value.trim()
    setCurrentImg(newImg)
    inputRef.current.value = ''
    setIsDisabled(true)
    setIsAddImg(true)
  }

  const errorImg = (e: SyntheticEvent) => {
    setIsAddImg(false)
    setIsErrorImg(true)
    const img = e.target as HTMLImageElement
    img.onerror = null
    setCurrentImg('')
  }

  return (
    <div className={styles.modalContent}>
      {currentImg ? (
        <>
          <img src={currentImg} onError={(e) => errorImg(e)}></img>
          <CancelIcon
            className={styles.cancel}
            fontSize="small"
            onClick={() => setCurrentImg('')}
          />
        </>
      ) : null}
      <TextField
        id="outlined-basic"
        label={t('addPostImgLabel')}
        variant="standard"
        className={styles.imgInput}
        inputRef={inputRef}
        onChange={() => onChangeInput()}
      />
      <Button onClick={handleClickBtn} isDisabled={isDisabled}>
        {t('addImg').toLocaleUpperCase()}
      </Button>
      {isErrorImg && <div className={styles.errMessage}>{t('errMessage')}</div>}
      {isAddImg && <div className={styles.addMessage}>{t('addMessage')}</div>}
    </div>
  )
}

export default NewsCreator
