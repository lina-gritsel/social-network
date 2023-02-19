import { FC } from 'react'

import RegistrationPage from '../pages/RegistrationPage'
import ProfilePage from '../pages/ProfilePage'
import FeedPage from '../pages/FeedPage'
import LoginPage from '../pages/LoginPage'
import SettingsPage from '../pages/SettingsPage'
import Page404 from '../pages/404Page'
import About from '../pages/AboutPage'
import ExplorePage from '../pages/ExplorePage'
import { PATHS } from './paths'

interface Routes {
  path: string
  component: FC
}

export const routes: Routes[] = [
  {
    path: PATHS.REGISTRATION,
    component: RegistrationPage,
  },
  {
    path: PATHS.LOGIN,
    component: LoginPage,
  },
  {
    path: PATHS.PROFILE,
    component: ProfilePage,
  },
  {
    path: PATHS.FEED,
    component: FeedPage,
  },
  {
    path: PATHS.SETTINGS,
    component: SettingsPage,
  },
  {
    path: PATHS.EXPLORE,
    component: ExplorePage,
  },
  {
    path: PATHS.PAGE_404,
    component: Page404,
  },
  {
    path: PATHS.ABOUT,
    component: About,
  },
]
