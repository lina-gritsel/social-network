import { FC } from 'react'

import { PATHS } from './paths'
import Page404 from '../pages/404Page'
import About from '../pages/AboutPage'
import FeedPage from '../pages/FeedPage'
import LoginPage from '../pages/LoginPage'
import LogoutPage from '../pages/LogoutPage'
import FriendsPage from '../pages/FriendsPage'
import ProfilePage from '../pages/ProfilePage'
import ExplorePage from '../pages/ExplorePage'
import SettingsPage from '../pages/SettingsPage'
import RegistrationPage from '../pages/RegistrationPage'

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
    path: PATHS.LOGOUT,
    component: LogoutPage,
  },
  {
    path: `${PATHS.PROFILE}/:id`,
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
  {
    path: `${PATHS.FRIENDS}/:id`,
    component: FriendsPage,
  },
]
