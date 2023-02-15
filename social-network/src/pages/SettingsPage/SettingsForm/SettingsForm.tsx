import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AccountCircle } from '@mui/icons-material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { Button, FormLabel, InputAdornment, Avatar } from '@mui/material'

import Input from '../../../components/Input'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'
import InputLanguages from '../../../components/InputLanguages'

import { useSettingsForm } from './hooks'

import styles from './SettingsForm.module.scss'

const SettingsForm: FC = () => {
  const { t } = useTranslation()

  const {
    control,
    errors,
    userInfo,
    isLoading,
    handleSubmit,
    onCancel,
    onSubmit,
  } = useSettingsForm()

  if (isLoading || !userInfo) {
    return <div className={styles.loading}>{t('loading')}</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.avatarBlock}>
        <Avatar className={styles.profileAvatar}>
          {userInfo?.name?.charAt(0)}
        </Avatar>
        <Button className={styles.editAvatar}>{t('editAvatar')}</Button>
      </div>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('nickname')}</FormLabel>
          <Input
            name="name"
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
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('birthday')}</FormLabel>
          <InputDate
            className={styles.inputDate}
            name="date"
            placeholder={t('birthday')}
            control={control}
            errors={errors}
          />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('email')}</FormLabel>
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
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('bio')}</FormLabel>
          <Input
            name="bio"
            control={control}
            placeholder={t('bio')}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AutoStoriesIcon />
                </InputAdornment>
              ),
            }}
            errors={errors}
          />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('gender')}</FormLabel>
          <InputGender
            name="gender"
            control={control}
            className={styles.inputGender}
          />
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('location')}</FormLabel>
          <Input
            name="location"
            control={control}
            placeholder={t('location')}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            errors={errors}
          />
        </div>
      </div>
      <h2 className={styles.title}>{t('socialLinks')}</h2>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('facebook')}</FormLabel>
          <Input
            name="facebook"
            control={control}
            placeholder={t('facebook')}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FacebookIcon />
                </InputAdornment>
              ),
            }}
            errors={errors}
          />
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('twitter')}</FormLabel>
          <Input
            name="twitter"
            control={control}
            placeholder={t('twitter')}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TwitterIcon />
                </InputAdornment>
              ),
            }}
            errors={errors}
          />
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('instagram')}</FormLabel>
          <Input
            name="instagram"
            control={control}
            placeholder={t('instagram')}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              ),
            }}
            errors={errors}
          />
        </div>
      </div>
      <h2 className={styles.title}>{t('languages')}</h2>
      <InputLanguages name="language" control={control} />
      <div className={styles.btnBlock}>
        <Button variant="outlined" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button variant="contained" type="submit">
          {t('save')}
        </Button>
      </div>
    </form>
  )
}

export default SettingsForm
