import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { FC, Dispatch, SetStateAction, MouseEvent } from 'react'

import Button from '../../components/Button'

import { useModalContent } from './hooks'

import styles from './Profile.module.scss'

interface IModalContent {
  setBgImage: Dispatch<SetStateAction<string>>
  isErrorImg: boolean
  setIsErrorImg: Dispatch<SetStateAction<boolean>>
  bgImageArr: string[]
  setBgImageArr: Dispatch<SetStateAction<string[]>>
}

const ModalContent: FC<IModalContent> = ({
  setBgImage,
  isErrorImg,
  setIsErrorImg,
  bgImageArr,
  setBgImageArr,
}) => {
  const { t } = useTranslation()
  const { inputRef, isDisabled, setIsDisabled } = useModalContent()

  const handleClickImg = (e: MouseEvent) => {
    setBgImage((e.target as HTMLImageElement).src)
    setIsErrorImg(false)
  }

  const handleClickBtn = () => {
    const newImg = inputRef.current.value.trim()
    setBgImage(newImg)
    setBgImageArr((prev) => (prev.includes(newImg) ? prev : [...prev, newImg]))
    inputRef.current.value = ''
  }

  const onChangeInput = () => {
    setIsErrorImg(false)
    inputRef.current.value.trim() === ''
      ? setIsDisabled(true)
      : setIsDisabled(false)
  }

  const deleteImg = (e: MouseEvent) => {
    const index = (e.currentTarget as HTMLSpanElement).id
    const indexNumber = parseFloat(index)
    setBgImageArr((prev) => [
      ...prev.slice(0, indexNumber),
      ...prev.slice(indexNumber + 1),
    ])
  }

  return (
    <div className={styles.modal}>
      <div className={styles.imgContainer}>
        {bgImageArr.map((img, index) => (
          <div className={styles.imgItem} key={index}>
            {index > 9 && (
              <span id={`${index}`} onClick={(e) => deleteImg(e)}>
                <CancelIcon className={styles.cancel} fontSize="small" />
              </span>
            )}
            <img
              src={img}
              className={styles.img}
              onClick={(e) => handleClickImg(e)}
            ></img>
          </div>
        ))}
      </div>
      <div className={styles.addingImg}>
        <TextField
          id="outlined-basic"
          label={t('addImgLabel')}
          variant="standard"
          className={styles.imgInput}
          inputRef={inputRef}
          onChange={() => onChangeInput()}
        />
        <Button onClick={handleClickBtn} isDisabled={isDisabled}>
          {t('addImg').toLocaleUpperCase()}
        </Button>
      </div>
      {isErrorImg && <div className={styles.errMessage}>{t('errMessage')}</div>}
    </div>
  )
}

export default ModalContent
