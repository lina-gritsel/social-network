import { FC, useState, KeyboardEvent } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { TextField } from '@mui/material'

import { getUserInfoSelector } from '../../../../store/selectors'
import Loader from '../../../../components/Loader'
import Modal from '../../../../components/Modal'
import Button from '../../../../components/Button'

import { DEFAULT_NUMBER_PICTURES } from '../../constants'

import styles from './WallpapersModal.module.scss'
import { useWallpaperModal } from './hooks'

interface WallpapersModalProps {
  onClose: () => void
  visible: boolean
  data: string[]
  isLoading: boolean
  isErrorImg: boolean
  setIsErrorImg: (value: boolean) => void
  onAddCurrentImage: (value: string) => void
  onErrorImage: () => void
  onSaveImage: () => Promise<void>
  onDeleteImage: (value: string) => Promise<void>
}

const WallpapersModal: FC<WallpapersModalProps> = ({
  onClose,
  visible,
  data,
  isLoading,
  isErrorImg,
  setIsErrorImg,
  onAddCurrentImage,
  onSaveImage,
  onDeleteImage,
  onErrorImage,
}) => {
  const { t } = useTranslation()
  const [input, setInputValue] = useState<string>('')

  const changeInput = (event) => {
    setInputValue(event.target.value)
    setIsErrorImg(false)
  }

  const oncloseModal = () => {
    setInputValue('')
    onClose()
  }

  return (
    <Modal
      open={visible}
      onClose={oncloseModal}
      title={t('backgroundTitle')}
      isDialogActions={false}
      className={styles.dialogContent}
    >
      <div className={styles.modal}>
        <div className={styles.imgContainer}>
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            data?.map((imageUrl, index) => (
              <div className={styles.imgItem} key={index}>
                {index >= DEFAULT_NUMBER_PICTURES && (
                  <CancelIcon
                    id={index.toString()}
                    className={styles.cancel}
                    fontSize="small"
                    onClick={() => onDeleteImage(imageUrl)}
                  />
                )}
                <img
                  src={imageUrl}
                  className={styles.img}
                  onClick={() => onAddCurrentImage(imageUrl)}
                  onError={onErrorImage}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.addingImg}>
          <TextField
            placeholder={t('addImgLabel')}
            className={styles.imgInput}
            onChange={(event) => changeInput(event)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && input ? onAddCurrentImage(input) : null
            }
          />
        </div>
        {isErrorImg && (
          <div className={styles.errMessage}>{t('errMessage')}</div>
        )}
        <Button onClick={onSaveImage}>save</Button>
      </div>
    </Modal>
  )
}

export default WallpapersModal
