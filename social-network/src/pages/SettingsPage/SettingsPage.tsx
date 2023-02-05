import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button } from '@mui/material'

import { userNews } from '../NewsPage/NewsPageComponents/userNews'
import SettingsForm from './SettingsForm'

import styles from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('settingsTitle')}</h2>
      <div className={styles.avatarBlock}>
        <Avatar
          alt="Remy Sharp"
          src={userNews[4].avatarImg}
          className={styles.profileAvatar}
        />
        <Button className={styles.editAvatar}>{t('editAvatar')}</Button>
      </div>
      <SettingsForm />
    </div>
  )
}

export default SettingsPage
