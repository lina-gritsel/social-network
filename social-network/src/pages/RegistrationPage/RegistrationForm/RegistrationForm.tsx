import { FC, useState, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LockIcon from '@mui/icons-material/Lock'

import Input from '../../../components/Input'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'
import InputPassword from '../../../components/InputPassword'
import { PATHS } from '../../../router/paths'

import styles from './RegistrationForm.module.scss'

const RegistrationForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isDateType, setIsDateType] = useState(false)

  const onChangeShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onChangeDateType = () => setIsDateType((date) => !date)

  const handleMouseDownOnDate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div className={styles.form}>
      <Input
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
        placeholder="Your Name"
        type="text"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <InputPassword
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
        <InputDate
          type={isDateType ? 'date' : 'text'}
          placeholder="Date of birth"
          className={styles.inputDate}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={onChangeDateType}
                  onMouseDown={handleMouseDownOnDate}
                >
                  <CalendarMonthIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <InputGender className={styles.inputGender} />
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
    </div>
  )
}

export default RegistrationForm
