import { Person, Newspaper,People, Explore } from '@mui/icons-material'
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
    to: PATHS.EXPLORE,
    label: 'explore',
    icon: <Explore />,
  },
  {
    to: PATHS.SETTINGS,
    label: 'settings',
    icon: <SettingsIcon />,
  },
  {
    to: PATHS.ABOUT,
    label: 'about',
    icon: <People />,
  },
]
