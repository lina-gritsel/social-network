import { Person, Newspaper,People,Settings } from '@mui/icons-material'
// import SettingsIcon from '@mui/icons-material/Settings'

import { PATHS } from '../../router/paths'

export const NAVIGATION_MENU = [
  {
    to: PATHS.PROFILE,
    label: 'Profile',
    icon: <Person />,
  },
  {
    to: PATHS.NEWS,
    label: 'News',
    icon: <Newspaper />,
  },
  {
    to: PATHS.ABOUT,
    label: 'About',
    icon: <People />,
  },
  {
    to: PATHS.SETTINGS,
    label: 'Settings',
    icon: <Settings />,
  }
]
