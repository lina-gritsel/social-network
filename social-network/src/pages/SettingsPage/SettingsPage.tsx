import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '../../components/Layout'

import SettingsForm from './SettingsForm'

import styles from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('settingsTitle')}</h2>
        <SettingsForm />
      </div>
    </Layout>
  )
}

export default SettingsPage
