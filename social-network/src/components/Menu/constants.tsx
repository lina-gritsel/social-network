import { Person, Newspaper,People } from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings'

import { PATHS } from '../../router/paths'

export const NAVIGATION_MENU = [
  {
    to: PATHS.PROFILE,
    label: 'profile',
    icon: <Person />,
  },
  {
    to: PATHS.NEWS,
    label: 'news',
    icon: <Newspaper />,
  },
  {
    to: PATHS.ABOUT,
    label: 'about',
    icon: <People />,
  },
  {
    to: PATHS.SETTINGS,
    label: 'settings',
    icon: <SettingsIcon />,
  },
]
