import { FC } from 'react'

import RegistrationPage from '../pages/RegistrationPage'
import { PATHS } from './paths'
import RootPage from '../pages/RootPage'
import ProfilePage from '../pages/ProfilePage'
import NewsPage from '../pages/NewsPage'
import LoginPage from '../pages/LoginPage'
import Page404 from '../pages/404Page'

interface Routes {
  path: string
  component: FC
}

export const routes: Routes[] = [
  {
    path: PATHS.ROOT,
    component: RootPage,
  },
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
    path: PATHS.NEWS,
    component: NewsPage,
  },
  {
    path: PATHS.PAGE_404,
    component: Page404,
  },
]
