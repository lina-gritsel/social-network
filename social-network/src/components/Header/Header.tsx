import { FC } from 'react'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'

import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <div className={styles.content}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for something here..."
      />
      <div className={styles.user}>
        <div className={styles.userName}>Remy Sharp</div>
        <Avatar sx={{ bgcolor: blue[500], width: 45, height: 45 }} />
      </div>
    </div>
  )
}

export default Header
