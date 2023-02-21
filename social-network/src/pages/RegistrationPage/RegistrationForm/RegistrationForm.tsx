import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconButton, InputAdornment } from '@mui/material'
import { AccountCircleOutlined } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

import { PATHS } from '../../../router/paths'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'
import InputPassword from '../../../components/InputPassword'
import { adornmentInputProps } from '../../SettingsPage/components/SettingsForm/SettingsForm'

import { useRegistrationForm } from './hooks'

import styles from './RegistrationForm.module.scss'

const RegistrationForm: FC = () => {
  const { t } = useTranslation()
  const {
    errors,
    control,
    showPassword,
    isRegistrError,
    onSubmit,
    handleSubmit,
    onChangeShowPassword,
    handleMouseDownPassword,
  } = useRegistrationForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        name="email"
        control={control}
        placeholder={t('email')}
        type="email"
        inputProps={adornmentInputProps({ icon: <AlternateEmailIcon /> })}
        errors={errors}
      />
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
        placeholder={t('createPassword')}
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
      <p className={styles.errorMessage}>
        {isRegistrError && 'This email or name is already in use'}
      </p>
      <Button className={styles.singInBtn} type="submit">
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
