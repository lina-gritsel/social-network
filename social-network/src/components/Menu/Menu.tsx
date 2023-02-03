import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ForumRounded } from '@mui/icons-material'

import { PATHS } from '../../router/paths'

import { NAVIGATION_MENU } from './constants'

import styles from './Menu.module.scss'

const Menu: FC = () => {
  return (
    <nav className={styles.container}>
      {NAVIGATION_MENU.map(({ to, label, icon }, index) => (
        <NavLink key={index} to={to} className={styles.menuItem}>
          {icon}
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu
