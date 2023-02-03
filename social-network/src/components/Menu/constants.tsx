import { Person, Newspaper, Explore } from '@mui/icons-material'

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
    to: PATHS.EXPLORE,
    label: 'Explore',
    icon: <Explore />,
  },
]
