import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import RegistrationForm from './RegistrationForm'

import styles from './RegistrationPage.module.scss'

const RegistrationPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('registerTitle')}</h1>
      <p className={styles.subtitle}>{t('registerSubtitle')}</p>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
