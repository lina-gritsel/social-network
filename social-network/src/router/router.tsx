import { FC, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch } from '../store'
import { fetchUser } from '../store/actions'
import { routes } from './routes'

export const Router: FC = () => {
  const dispatch = useAppDispatch()

  const userId = JSON.parse(localStorage.getItem('userId'))

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/news" />} />
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
    </BrowserRouter>
  )
}

export default Router
