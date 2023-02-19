import React, { FC } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import {
  ShieldOutlined,
  TranslateOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material'

import { SettingsTab } from '../../SettingsPage'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  settingsTab: string
  setSettingsTab: (tab: string) => void
}

const Sidebar: FC<SidebarProps> = ({ settingsTab, setSettingsTab }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.sidebar}>
      <div
        onClick={() => setSettingsTab(SettingsTab.EDIT)}
        className={classNames(
          { [styles.menuListActive]: settingsTab === SettingsTab.EDIT },
          styles.menuList,
        )}
      >
        <PersonOutlineOutlined />
        {t('settingsTitle')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.LANGUAGES)}
        className={classNames(
          { [styles.menuListActive]: settingsTab === SettingsTab.LANGUAGES },
          styles.menuList,
        )}
      >
        <TranslateOutlined />
        {t('languages')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.THEME)}
        className={classNames(
          { [styles.menuListActive]: settingsTab === SettingsTab.THEME },
          styles.menuList,
        )}
      >
        <DarkModeOutlinedIcon />
        {t('theme')}
      </div>
      <div
        onClick={() => setSettingsTab(SettingsTab.SECURE)}
        className={classNames(
          { [styles.menuListActive]: settingsTab === SettingsTab.SECURE },
          styles.menuList,
        )}
      >
        <ShieldOutlined />
        {t('secure')}
      </div>
    </div>
  )
}

export default Sidebar
