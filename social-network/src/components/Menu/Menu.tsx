import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_MENU } from './constants'

import styles from './Menu.module.scss'

const Menu: FC = () => {
  const { t } = useTranslation()

  return (
    <nav className={styles.container}>
      {NAVIGATION_MENU.map(({ to, label, icon }, index) => (
        <NavLink key={index} to={to} className={styles.menuItem}>
          {icon}
          {t(label)}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu
