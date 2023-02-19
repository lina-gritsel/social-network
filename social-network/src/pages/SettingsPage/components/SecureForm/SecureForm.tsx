import React from 'react'
import { useTranslation } from 'react-i18next'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import Modal from '../../../../components/Modal'

import { useSecureForm } from './hooks'
import DeleteAccountModal from './DeleteAccountModal'

import styles from './SecureForm.module.scss'

const SecureForm = () => {
  const { t } = useTranslation()
  const {
    visibleDeleteAccountModal,
    deleteAccount,
    openDeleteAccountModal,
    closeDeleteAccountModal,
  } = useSecureForm()

  return (
    <div>
      <Modal
        open={visibleDeleteAccountModal}
        onClose={closeDeleteAccountModal}
        content={
          <DeleteAccountModal
            deleteAccount={deleteAccount}
            closeDeleteAccountModal={closeDeleteAccountModal}
          />
        }
        isDialogActions={false}
      />
      <div className={styles.secureBlock} onClick={openDeleteAccountModal}>
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
