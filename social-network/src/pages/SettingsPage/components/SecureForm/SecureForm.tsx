import React from 'react'
import { useTranslation } from 'react-i18next'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import Modal from '../../../../components/Modal'

import { useSecureForm } from './hooks'
import DeleteAccountModal from './DeleteAccountModal'

import styles from './SecureForm.module.scss'

const SecureForm = () => {
  const { t } = useTranslation()
  const { open, userId, handleOpen, handleClose, deleteAccount } =
    useSecureForm()

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        content={
          <DeleteAccountModal
            userId={userId}
            deleteAccount={deleteAccount}
            handleClose={handleClose}
          />
        }
        isDialogActions={false}
      />
      <div className={styles.secureBlock} onClick={handleOpen}>
        <DeleteOutlineOutlinedIcon />
        <div className={styles.titleBlock}>
          <p className={styles.title}>{t('deleteAcc')}</p>
          <p className={styles.subtitle}>{t('deleteMessage')}</p>
        </div>
      </div>
    </div>
  )
}

export default SecureForm
