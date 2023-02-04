import { FC } from 'react'

import RegistrationPage from '../pages/RegistrationPage'
import { PATHS } from './paths'
import ProfilePage from '../pages/ProfilePage'
import NewsPage from '../pages/NewsPage'
import LoginPage from '../pages/LoginPage'
import Page404 from '../pages/404Page'
import About from '../pages/AboutPage'

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
    path: PATHS.NEWS,
    component: NewsPage,
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
