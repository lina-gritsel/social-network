import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Avatar, Button } from '@mui/material'

import Layout from '../../components/Layout'
import { getUserInfoSelector } from '../../store/selectors'

import SettingsForm from './SettingsForm'

import styles from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
  const { t } = useTranslation()
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <Layout>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('settingsTitle')}</h2>
        <div className={styles.avatarBlock}>
          <Avatar className={styles.profileAvatar}>
            {userInfo?.name?.charAt(0)}
          </Avatar>
          <Button className={styles.editAvatar}>{t('editAvatar')}</Button>
        </div>
        <SettingsForm />
      </div>
    </Layout>
  )
}

export default SettingsPage
