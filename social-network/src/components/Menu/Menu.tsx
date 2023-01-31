import { FC } from 'react'

import styles from './Menu.module.scss'

const Menu: FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <a href="/profile">Profile</a>
      </div>
      <div>
        <a href="/news">News</a>
      </div>
      <div>
        <a href="/login">Login</a>
      </div>
      <div>
        <a href="/registration">Registration</a>
      </div>
    </div>
  )
}

export default Menu
