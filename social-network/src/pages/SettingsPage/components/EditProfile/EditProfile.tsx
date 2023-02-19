import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import SettingsForm from '../SettingsForm/SettingsForm'

import styles from './EditProfile.module.scss'

const EditProfile: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2 className={styles.title}>{t('settingsTitle')}</h2>
      <SettingsForm />
    </>
  )
}

export default EditProfile
