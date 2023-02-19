import { FC, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import { useAppDispatch } from '../store'
import { fetchUser, setTheme } from '../store/actions'

export const Router: FC = () => {
  const dispatch = useAppDispatch()

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
  const theme = (localStorage.getItem('theme') as string) || 'light'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    dispatch(fetchUser(userId))
    dispatch(setTheme(theme))
  }, [dispatch, userId, theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/registration" />} />
        {routes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
