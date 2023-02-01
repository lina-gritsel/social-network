import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'

import { PATHS } from '../../router/paths'

import LoginForm from './LoginForm'

import styles from './LoginPage.module.scss'

const LoginPage: FC = () => {
  return (
    <>
      <NavLink to={PATHS.ROOT}>
        <IconButton>
          <ReplyIcon />
        </IconButton>
      </NavLink>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login To Your Account</h1>
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
