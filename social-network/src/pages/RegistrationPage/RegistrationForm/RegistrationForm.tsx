import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LockIcon from '@mui/icons-material/Lock'

import Input from '../../../components/Input'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'
import InputPassword from '../../../components/InputPassword'
import { PATHS } from '../../../router/paths'

import { useRegistrationForm } from './hooks'

import styles from './RegistrationForm.module.scss'

const RegistrationForm: FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    showPassword,
    onChangeShowPassword,
    handleMouseDownPassword,
    errors
  } = useRegistrationForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        name="email"
        control={control}
        placeholder="Your Email"
        type="email"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Input
        name="name"
        control={control}
        placeholder="Your Name"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <InputPassword
        name="password"
        control={control}
        placeholder="Create Password"
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onChangeShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className={styles.block}>
        <InputDate className={styles.inputDate} name="date" control={control} />
        <InputGender
          name="gender"
          control={control}
          className={styles.inputGender}
        />
      </div>
      <Button variant="contained" fullWidth type="submit">
        Sign Up
      </Button>
      <div className={styles.block}>
        <p className={styles.text}>Already have an account?</p>
        <NavLink to={PATHS.LOGIN}>
          <div className={styles.link}>Sign In</div>
        </NavLink>
      </div>
    </form>
  )
}

export default RegistrationForm
