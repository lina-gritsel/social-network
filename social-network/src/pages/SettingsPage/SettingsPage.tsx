import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import SettingsForm from './SettingsForm'

import styles from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('settingsTitle')}</h2>
      <img
        src="https://support.discord.com/hc/user_images/81TKxGEqVJruMIz7RCN8JA.jpeg"
        alt="avatar"
        className={styles.avatar}
      />
      <SettingsForm />
    </div>
  )
}

export default SettingsPage
