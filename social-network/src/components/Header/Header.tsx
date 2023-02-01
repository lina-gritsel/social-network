import { FC } from 'react'

import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <div className={styles.content}>
      <input type="text" className={styles.searchInput} placeholder='Search for something here...'/>
    </div>
  )
}

export default Header
