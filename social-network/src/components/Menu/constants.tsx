import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  GridView,
  PersonOutline,
  PeopleOutline,
  ExploreOutlined,
  SettingsOutlined,
  Diversity3Outlined
} from '@mui/icons-material'

import { PATHS } from '../../router/paths'

export const NAVIGATION_MENU = [
  {
    to: `${PATHS.PROFILE}/me`,
    label: 'profile',
    icon: <PersonOutline />,
  },
  {
    to: PATHS.FEED,
    label: 'feed',
    icon: <GridView />,
  },
  {
    to: PATHS.FRIENDS,
    label: 'my community',
    icon: <Diversity3Outlined />,
  },
  {
    to: PATHS.EXPLORE,
    label: 'explore',
    icon: <ExploreOutlined />,
  },
  {
    to: PATHS.SETTINGS,
    label: 'settings',
    icon: <SettingsOutlined />,
  },
  {
    to: PATHS.ABOUT,
    label: 'about',
    icon: <PeopleOutline />,
  },
  {
    to: PATHS.LOGOUT,
    label: 'logout',
    icon: <LogoutOutlinedIcon />,
  },
]
