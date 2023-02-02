import { FC } from 'react'

import RegistrationForm from './RegistrationForm'

import styles from './RegistrationPage.module.scss'

const RegistrationPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Getting Started</h1>
      <p className={styles.subtitle}>
        Create an account to continue and connect with the people.
      </p>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
