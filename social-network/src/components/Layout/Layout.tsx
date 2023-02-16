import Box from '@mui/material/Box'
import { FC, ReactNode } from 'react'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { ForumRounded } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'

import Menu from '../Menu'
import Header from '../Header'

import styles from './Layout.module.scss'

const drawerWidth = 240

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
    <Box className={styles.layout}>
      <AppBar
        className={styles.appBar}
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar className={styles.toolbar}>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
          '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
            borderRight: 0,
          },
        }}
        variant="permanent"
        anchor="left"
        className={styles.mainMenu}
      >
        <Link to={PATHS.NEWS} className={styles.mainMenuItem}>
          <ForumRounded color="primary" className={styles.forum} />
          OurNetwork
        </Link>
        <List>
          <Menu />
        </List>
      </Drawer>
      <Box
        component="main"
        className={styles.wrapperContent}
        sx={{ flexGrow: 1 }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default Layout
