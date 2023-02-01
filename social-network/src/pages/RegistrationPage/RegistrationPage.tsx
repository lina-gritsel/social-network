import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'

import { PATHS } from '../../router/paths'

import RegistrationForm from './RegistrationForm'

import styles from './RegistrationPage.module.scss'

const RegistrationPage: FC = () => {
  return (
    <>
      <NavLink to={PATHS.ROOT}>
        <IconButton>
          <ReplyIcon />
        </IconButton>
      </NavLink>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Getting Started</h1>
        <p className={styles.subtitle}>
          Create an account to continue and connect with the people.
        </p>
        <RegistrationForm />
      </div>
    </>
  )
}

export default RegistrationPage
