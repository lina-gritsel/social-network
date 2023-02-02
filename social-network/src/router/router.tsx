import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from '../components/Layout'
import { routes } from './routes'

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/news" />} />
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
