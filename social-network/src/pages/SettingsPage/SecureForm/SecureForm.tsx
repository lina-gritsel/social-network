import React from 'react'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './SecureForm.module.scss'

const SecureForm = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className={styles.secureBlock}>
        <DeleteIcon />
        <div className={styles.titleBlock}>
          <p className={styles.title}>{t('deleteAcc')}</p>
          <p className={styles.subtitle}>{t('deleteMessage')}</p>
        </div>
      </div>
    </div>
  )
}

export default SecureForm
