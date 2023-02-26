import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import CancelIcon from '@mui/icons-material/CancelOutlined'

import Loader from '../../../../components/Loader'
import Modal from '../../../../components/Modal'

import { DEFAULT_NUMBER_PICTURES } from '../../constants'

import { useWallpaperModal } from './hooks'

import styles from './WallpapersModal.module.scss'

interface WallpapersModalProps {
  onClose: () => void
  visible: boolean
}

const WallpapersModal: FC<WallpapersModalProps> = ({ onClose, visible }) => {
  const { t } = useTranslation()

  const { deleteImg, isLoading, wallpapers, handleClickImg } =
    useWallpaperModal()

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
            wallpapers?.map((imageUrl, index) => (
              <div className={styles.imgItem} key={index}>
                {index >= DEFAULT_NUMBER_PICTURES && (
                  <CancelIcon
                    id={index}
                    className={styles.cancel}
                    fontSize="small"
                    onClick={(e) => deleteImg(e)}
                  />
                )}
                <img
                  src={imageUrl}
                  className={styles.img}
                  onClick={(event: any) => handleClickImg(event)}
                />
              </div>
            ))
          )}
        </div>
        {/* <div className={styles.addingImg}>
            <TextField
              placeholder={t('addImgLabel')}
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
          </div> */}
        {/* {isErrorImg && (
            <div className={styles.errMessage}>{t('errMessage')}</div>
          )} */}
      </div>
    </Modal>
  )
}

export default WallpapersModal
