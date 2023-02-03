import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { ForumRounded } from '@mui/icons-material'

import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'


import styles from './Layout.module.scss'
import { PATHS } from '../../router/paths'
import Header from '../Header'
import Menu from '../Menu'


const drawerWidth = 240

type LayotProps = {
  children: ReactNode
}

const Layout: FC<LayotProps> = (props) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
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
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Link to={PATHS.NEWS} className={styles.mainMenuItem}>
            <ForumRounded color="primary" className={styles.forum} />
            OurNetwork
          </Link>
          <Divider />
          <List>
            <Menu />
          </List>
          <Divider />
        </Drawer>
        <Box component="main" className={styles.content} sx={{ flexGrow: 1 }}>
          <div className={styles.content}>{props.children}</div>
        </Box>
      </Box>
    </>
  )
}

export default Layout
