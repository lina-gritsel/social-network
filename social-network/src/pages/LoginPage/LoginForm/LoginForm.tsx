import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import LockIcon from '@mui/icons-material/Lock'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material'

import Input from '../../../components/Input'
import InputPassword from '../../../components/InputPassword'

import { useLoginForm } from './hooks'

import styles from './LoginForm.module.scss'

const LoginForm: FC = () => {
  const { t } = useTranslation()
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
        name="nickname"
        control={control}
        placeholder={t('nickname')}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        errors={errors}
      />
      <InputPassword
        name="password"
        control={control}
        placeholder={t('enterPassword')}
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
        {t('logIn')}
      </Button>
    </form>
  )
}
export default LoginForm
