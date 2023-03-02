import { FC } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import {
  ShieldOutlined,
  TranslateOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material'

import { SettingsTab } from '../../SettingsPage'

import styles from './SidebarMobile.module.scss'

interface SidebarMobileProps {
  settingsTab: string
  setSettingsTab: (tab: string) => void
}

const SidebarMobile: FC<SidebarMobileProps> = ({
  settingsTab,
  setSettingsTab,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.sidebarMobile}>
      <div
        onClick={() => setSettingsTab(SettingsTab.EDIT)}
        className={classNames(
          { [styles.menuListMobileActive]: settingsTab === SettingsTab.EDIT },
          styles.menuListMobile,
        )}
      >
        <PersonOutlineOutlined />
        {t('settingsTitle')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.LANGUAGES)}
        className={classNames(
          { [styles.menuListMobileActive]: settingsTab === SettingsTab.LANGUAGES },
          styles.menuListMobile,
        )}
      >
        <TranslateOutlined />
        {t('languages')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.THEME)}
        className={classNames(
          { [styles.menuListMobileActive]: settingsTab === SettingsTab.THEME },
          styles.menuListMobile,
        )}
      >
        <DarkModeOutlinedIcon />
        {t('theme')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.SECURE)}
        className={classNames(
          { [styles.menuListMobileActive]: settingsTab === SettingsTab.SECURE },
          styles.menuListMobile,
        )}
      >
        <ShieldOutlined />
        {t('secure')}
      </div>
    </div>
  )
}

export default SidebarMobile
