import { Person, Newspaper } from '@mui/icons-material'

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
    to: PATHS.REGISTRATION,
    label: 'Registration',
  },
  {
    to: PATHS.LOGIN,
    label: 'Login',
  },
]
