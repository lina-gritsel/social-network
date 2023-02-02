import { FC } from 'react'

import LoginForm from './LoginForm'

import styles from './LoginPage.module.scss'

const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Login To Your Account</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage
