import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, FormLabel, InputAdornment } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import Input from '../../../components/Input'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'
import InputLanguages from '../../../components/InputLanguages'

import { useSettingsForm } from './hooks'

import styles from './SettingsForm.module.scss'

const SettingsForm: FC = () => {
  const { t } = useTranslation()

  const { control, handleSubmit, onCancel, onSubmit, errors } =
    useSettingsForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>{t('name')}</FormLabel>
          <Input
            name="name"
            control={control}
            placeholder={t('name')}
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
