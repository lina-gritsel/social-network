import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { FC, Dispatch, SetStateAction, MouseEvent } from 'react'

import Loader from '../../components/Loader'
import Button from '../../components/Button'

import { DEFAULT_ARR_LENGTH } from './constants'
import { useModalContent } from './hooks'

import styles from './Profile.module.scss'
import { changeUser } from '../../api'

interface IModalContent {
  setBgImage: Dispatch<SetStateAction<string>>
  isErrorImg: boolean
  isLoading: boolean
  setIsErrorImg: Dispatch<SetStateAction<boolean>>
  bgImageArr: string[]
  setBgImageArr: Dispatch<SetStateAction<string[]>>
}

const ModalContent: FC<IModalContent> = ({
  setBgImage,
  isErrorImg,
  isLoading,
  setIsErrorImg,
  bgImageArr,
  setBgImageArr,
}) => {
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
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

  const deleteImg = async (e: MouseEvent) => {
    const index = (e.currentTarget as HTMLElement).id
    const indexNumber = parseFloat(index)
    const newImageArr = bgImageArr.filter((img, index) => index !== indexNumber)
    setBgImageArr(newImageArr)
    const wallpapers = newImageArr.filter(
      (el, index) => index >= DEFAULT_ARR_LENGTH,
    )
    await changeUser({ wallpapers: wallpapers }, userId)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.imgContainer}>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          bgImageArr?.map((img, index) => (
            <div className={styles.imgItem} key={index}>
              {index >= DEFAULT_ARR_LENGTH && (
                <CancelIcon
                  className={styles.cancel}
                  id={index.toString()}
                  fontSize="small"
                  onClick={(e) => deleteImg(e)}
                />
              )}
              <img
                src={img}
                className={styles.img}
                onClick={(e) => handleClickImg(e)}
              ></img>
            </div>
          ))
        )}
      </div>
      <div className={styles.addingImg}>
        <TextField
          placeholder={t('addImgLabel')}
          className={styles.imgInput}
          inputRef={inputRef}
          onChange={() => onChangeInput()}
        />
        <Button
          className={isDisabled ? styles.addImgBtn : styles.addImgActiveBtn}
          onClick={handleClickBtn}
          isDisabled={isDisabled}
        >
          {t('addImg').toLocaleUpperCase()}
        </Button>
      </div>
      {isErrorImg && <div className={styles.errMessage}>{t('errMessage')}</div>}
    </div>
  )
}

export default ModalContent
