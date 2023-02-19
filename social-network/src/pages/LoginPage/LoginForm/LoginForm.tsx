import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, InputAdornment } from '@mui/material'
import { AccountCircleOutlined } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

import Input from '../../../components/Input'
import Button from '../../../components/Button'
import InputPassword from '../../../components/InputPassword'

import { useLoginForm } from './hooks'

import styles from './LoginForm.module.scss'

const LoginForm: FC = () => {
  const { t } = useTranslation()
  const {
    errors,
    control,
    isUserExist,
    isLoginError,
    showPassword,
    onSubmit,
    handleSubmit,
    changeErrorMessage,
    onChangeShowPassword,
    handleMouseDownPassword,
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        name="name"
        control={control}
        placeholder={t('nickname')}
        inputProps={adornmentInputProps({ icon: <AccountCircleOutlined /> })}
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
              <LockOutlinedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onChangeShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        errors={errors}
      />
      <p className={styles.errorMessage}>
        {changeErrorMessage(isLoginError, isUserExist)}
      </p>
      <Button className={styles.logInBtn} type="submit">
        {t('logIn')}
      </Button>
    </form>
  )
}
export default LoginForm

const adornmentInputProps = ({
  position = 'start',
  icon,
}: {
  position?: 'start' | 'end'
  icon: ReactNode
}) => {
  return {
    startAdornment: <InputAdornment position={position}>{icon}</InputAdornment>,
  }
}
