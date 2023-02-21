import {
  PersonOutline,
  ExploreOutlined,
  PeopleOutline,
  SettingsOutlined,
  GridView,
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
]
