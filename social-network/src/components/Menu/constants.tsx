import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  GridView,
  PersonOutline,
  PeopleOutline,
  ExploreOutlined,
  SettingsOutlined,
  Diversity3Outlined,
} from '@mui/icons-material'

import { PATHS } from '../../router/paths'

import styles from '../MobileMenu/MobileMenu.module.scss'

export const NAVIGATION_MENU = [
  {
    to: `${PATHS.PROFILE}/me`,
    label: 'profile',
    icon: <PersonOutline className={styles.icon} />,
  },
  {
    to: PATHS.FEED,
    label: 'feed',
    icon: <GridView className={styles.icon} />,
  },
  {
    to: `${PATHS.FRIENDS}/me`,
    label: 'friends',
    icon: <Diversity3Outlined className={styles.icon} />,
  },
  {
    to: PATHS.EXPLORE,
    label: 'explore',
    icon: <ExploreOutlined className={styles.icon} />,
  },
  {
    to: PATHS.SETTINGS,
    label: 'settings',
    icon: <SettingsOutlined className={styles.icon} />,
  },
  {
    to: PATHS.ABOUT,
    label: 'about',
    icon: <PeopleOutline className={styles.icon} />,
  },
  {
    to: PATHS.LOGOUT,
    label: 'logout',
    icon: <LogoutOutlinedIcon className={styles.icon} />,
  },
]
