import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    onSubmit,
    showPassword,
    onChangeShowPassword,
    handleMouseDownPassword,
    errors,
  } = useRegistrationForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        name="email"
        control={control}
        placeholder={t('email')}
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
        placeholder={t('createPassword')}
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
      <div className={styles.block}>
        <InputDate
          className={styles.inputDate}
          name="date"
          placeholder={t('birthday')}
          control={control}
          errors={errors}
        />
        <InputGender
          name="gender"
          control={control}
          className={styles.inputGender}
        />
      </div>
      <Button variant="contained" fullWidth type="submit">
        {t('signUp')}
      </Button>
      <div className={styles.block}>
        <p className={styles.account}>{t('account')}</p>
        <NavLink to={PATHS.LOGIN}>
          <div className={styles.link}>{t('signIn')}</div>
        </NavLink>
      </div>
    </form>
  )
}

export default RegistrationForm
