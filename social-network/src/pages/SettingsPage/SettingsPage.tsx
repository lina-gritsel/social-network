import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputLanguages from '../../components/InputLanguages'
import Layout from '../../components/Layout'

import EditProfile from './components/EditProfile'
import SecureForm from './components/SecureForm'
import styles from './SettingsPage.module.scss'
import Sidebar from './components/Sidebar'

export enum SettingsTab {
  EDIT = 'edit',
  SECURE = 'secure',
  LANGUAGES = 'languages',
}

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  const [settingsTab, setSettingsTab] = useState<string>(SettingsTab.EDIT)

  return (
    <Layout>
      <div className={styles.layout}>
        <div className={styles.settingsWrapper}>
          <Sidebar settingsTab={settingsTab} setSettingsTab={setSettingsTab} />
          <div className={styles.wrapper}>
            {settingsTab === SettingsTab.EDIT && <EditProfile />}
            {settingsTab === SettingsTab.LANGUAGES && (
              <>
                <h2 className={styles.title}>{t('languages')}</h2>
                <p className={styles.subtitle}>{t('langSubtitle')}</p>
                <InputLanguages />
              </>
            )}
            {settingsTab === SettingsTab.SECURE && (
              <>
                <h2 className={styles.title}>{t('secure')}</h2>
                <SecureForm />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SettingsPage
