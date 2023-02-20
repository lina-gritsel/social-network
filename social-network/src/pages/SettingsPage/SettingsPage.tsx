import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import Layout from '../../components/Layout'
import InputLanguages from '../../components/InputLanguages'

import SecureForm from './SecureForm'
import SettingsForm from './SettingsForm'

import styles from './SettingsPage.module.scss'

enum SettingsTab {
  EDIT = 'edit',
  LANGUAGES = 'languages',
  SECURE = 'secure',
}

const SettingsPage: FC = () => {
  const { t } = useTranslation()

  const [settingsTab, setSettingsTab] = useState<string>(SettingsTab.EDIT)

  return (
    <Layout>
      <div className={styles.settingsWrapper}>
        <div className={styles.sidebar}>
          <div
            onClick={() => setSettingsTab(SettingsTab.EDIT)}
            className={
              settingsTab === SettingsTab.EDIT
                ? styles.menuListActive
                : styles.menuList
            }
          >
            <PersonOutlineOutlinedIcon />
            {t('settingsTitle')}
          </div>
          <div
            onClick={() => setSettingsTab(SettingsTab.LANGUAGES)}
            className={
              settingsTab === SettingsTab.LANGUAGES
                ? styles.menuListActive
                : styles.menuList
            }
          >
            <TranslateOutlinedIcon />
            {t('languages')}
          </div>
          <div
            onClick={() => setSettingsTab(SettingsTab.SECURE)}
            className={
              settingsTab === SettingsTab.SECURE
                ? styles.menuListActive
                : styles.menuList
            }
          >
            <ShieldOutlinedIcon />
            {t('secure')}
          </div>
        </div>
        <div className={styles.wrapper}>
          {settingsTab === SettingsTab.EDIT && (
            <>
              <h2 className={styles.title}>{t('settingsTitle')}</h2>
              <SettingsForm />
            </>
          )}
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
    </Layout>
  )
}

export default SettingsPage
