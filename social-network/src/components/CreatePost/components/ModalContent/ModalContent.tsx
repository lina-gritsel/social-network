import { FC, useRef, useState, SyntheticEvent, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import CancelIcon from '@mui/icons-material/CancelOutlined'

import Button from '../../../Button'
import { pressEnter } from '../../../../utils'

import styles from './ModalContent.module.scss'

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
        placeholder={t('addPostImgLabel')}
        className={styles.imgInput}
        inputRef={inputRef}
        onChange={() => onChangeInput()}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
          pressEnter(e, handleClickBtn)
        }
      />
      <Button
        className={isDisabled ? styles.addImgBtn : styles.addImgActiveBtn}
        onClick={handleClickBtn}
        isDisabled={isDisabled}
      >
        {t('addImg').toLocaleUpperCase()}
      </Button>
      {isErrorImg && <div className={styles.errMessage}>{t('errMessage')}</div>}
      {isAddImg && <div className={styles.addMessage}>{t('addMessage')}</div>}
    </div>
  )
}

export default ModalContent
