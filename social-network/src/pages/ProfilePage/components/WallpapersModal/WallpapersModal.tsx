import { FC, useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { TextField } from '@mui/material'

import Loader from '../../../../components/Loader'
import Modal from '../../../../components/Modal'
import Button from '../../../../components/Button'

import { DEFAULT_NUMBER_PICTURES } from '../../constants'

import styles from './WallpapersModal.module.scss'

interface WallpapersModalProps {
  onClose: () => void
  visible: boolean
  data: string[]
  isLoading: boolean
  onAddCurrentImage: (value: string) => void
  onSaveImage: () => Promise<void>
  onDeleteImage: (value: string) => Promise<void>
}

const WallpapersModal: FC<WallpapersModalProps> = ({
  onClose,
  visible,
  data,
  isLoading,
  onAddCurrentImage,
  onSaveImage,
  onDeleteImage,
}) => {
  const { t } = useTranslation()
  const [input, setInputValue] = useState<string>('')

  return (
    <Modal
      open={visible}
      onClose={onClose}
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
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.addingImg}>
          <TextField
            placeholder={t('addImgLabel')}
            className={styles.imgInput}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && input ? onAddCurrentImage(input) : null
            }
          />
        </div>
        {/* {isErrorImg && (
          <div className={styles.errMessage}>{t('errMessage')}</div>
        )} */}
        <Button onClick={onSaveImage}>save</Button>
      </div>
    </Modal>
  )
}

export default WallpapersModal
