import { FC, ReactNode } from 'react'

import styles from './Layout.module.scss'
import Header from '../Header'
import Menu from '../Menu'

type LayotProps = {
  children: ReactNode
}

const Layout: FC<LayotProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Menu />
        <Header />
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default Layout
