import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_MENU } from '../Menu/constants'

import styles from './MobileMenu.module.scss'

const MobileMenu: FC = () => {
  const { t } = useTranslation()

  return (
    <nav className={styles.container}>
      {NAVIGATION_MENU.map(({ to, label, icon }, index) => (
        <NavLink key={index} to={to} className={styles.menuItem}>
          <div>{icon}</div>
          <div className={styles.label}>{t(label)}</div>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileMenu
