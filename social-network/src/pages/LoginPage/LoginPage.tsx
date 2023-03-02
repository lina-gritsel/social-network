import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import LoginForm from './LoginForm'

import styles from './LoginPage.module.scss'

const LoginPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('loginTitle')}</h1>
      <p className={styles.subtitle}>{t('loginSubtitle')}</p>
      <LoginForm />
    </div>
  )
}

export default LoginPage
