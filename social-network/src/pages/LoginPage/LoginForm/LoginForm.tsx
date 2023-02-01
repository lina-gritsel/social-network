import { FC } from 'react'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LockIcon from '@mui/icons-material/Lock'

import Input from '../../../components/Input'
import InputPassword from '../../../components/InputPassword'

import { useLoginForm } from './hooks'

import styles from './LoginForm.module.scss'

const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    showPassword,
    onChangeShowPassword,
    handleMouseDownPassword,
    errors,
  } = useLoginForm()
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
        errors={errors}
      />
      <InputPassword
        name="password"
        control={control}
        placeholder="Enter Password"
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
        errors={errors}
      />
      <Button variant="contained" fullWidth type="submit">
        Log in
      </Button>
    </form>
  )
}
export default LoginForm
