import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'

import Menu from '../Menu'
import Header from '../Header'
import MobileMenu from '../MobileMenu'

import styles from './Layout.module.scss'

type LayotProps = {
  children: ReactNode
}

const Layout: FC<LayotProps> = (props) => {
  const navigate = useNavigate()

  const userId = JSON.parse(localStorage.getItem('userId')) as string

  if (!userId) {
    navigate(PATHS.REGISTRATION)
  }

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Menu />
        <div className={styles.childrenBlock}>{props.children}</div>
      </div>
      <MobileMenu />
    </div>
  )
}

export default Layout
