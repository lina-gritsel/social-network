import { FC } from 'react'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'

import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.userName}>Remy Sharp</div>
      <Avatar sx={{ bgcolor: blue[500], width: 40, height: 40 }} />
    </div>
  )
}

export default Header
