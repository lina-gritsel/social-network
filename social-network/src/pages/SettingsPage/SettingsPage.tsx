import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from '../../components/Layout'
import InputLanguages from '../../components/InputLanguages'

import Sidebar from './components/Sidebar'
import ThemeForm from './components/ThemeForm'
import SecureForm from './components/SecureForm'
import EditProfile from './components/EditProfile'
import SidebarMobile from './components/SidebarMobile'

import styles from './SettingsPage.module.scss'

export enum SettingsTab {
  EDIT = 'edit',
  SECURE = 'secure',
  LANGUAGES = 'languages',
  THEME = 'theme',
}

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  const [settingsTab, setSettingsTab] = useState<string>(SettingsTab.EDIT)

  return (
    <Layout>
      <div className={styles.layout}>
      <SidebarMobile settingsTab={settingsTab} setSettingsTab={setSettingsTab} />
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
            {settingsTab === SettingsTab.THEME && (
              <>
                <h2 className={styles.title}>{t('theme')}</h2>
                <p className={styles.subtitle}>{t('themeSubtitle')}</p>
                <ThemeForm />
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
