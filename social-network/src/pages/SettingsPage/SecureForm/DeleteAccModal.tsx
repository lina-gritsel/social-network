import { useTranslation } from 'react-i18next'

import Button from '../../../components/Button'

import styles from './SecureForm.module.scss'

const DeleteAccModal = ({ userId, handleClose, deleteAccount }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.modal}>
      <div className={styles.titleBlock}>
        <p className={styles.title}>{t('deleteAcc')}</p>
        <p className={styles.subtitle}>{t('warning')}</p>
      </div>
      <div className={styles.btnBlock}>
        <Button
          className={styles.deleteBtn}
          onClick={() => deleteAccount(userId)}
        >
          {t('deleteAcc')}
        </Button>
        <Button outlined className={styles.cancelBtn} onClick={handleClose}>
          {t('cancel')}
        </Button>
      </div>
    </div>
  )
}

export default DeleteAccModal
