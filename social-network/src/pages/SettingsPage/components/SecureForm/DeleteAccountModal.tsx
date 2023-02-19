import { useTranslation } from 'react-i18next'

import Button from '../../../../components/Button'

import styles from './SecureForm.module.scss'

const DeleteAccountModal = ({
  deleteAccount,
  closeDeleteAccountModal,
}) => {
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
          onClick={() => deleteAccount()}
        >
          {t('deleteAcc')}
        </Button>
        <Button
          outlined
          className={styles.cancelBtn}
          onClick={closeDeleteAccountModal}
        >
          {t('cancel')}
        </Button>
      </div>
    </div>
  )
}

export default DeleteAccountModal
