import {
  PersonOutline,
  NewspaperOutlined,
  ExploreOutlined,
  PeopleOutline,
  SettingsOutlined,
} from '@mui/icons-material'

import { PATHS } from '../../router/paths'

export const NAVIGATION_MENU = [
  {
    to: PATHS.PROFILE,
    label: 'profile',
    icon: <PersonOutline />,
  },
  {
    to: PATHS.NEWS,
    label: 'news',
    icon: <NewspaperOutlined />,
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
