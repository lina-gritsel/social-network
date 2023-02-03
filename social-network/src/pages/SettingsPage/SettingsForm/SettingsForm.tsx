import { FC } from 'react'
import { Button, FormLabel, InputAdornment } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import Input from '../../../components/Input'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'

import { useSettingsForm } from './hooks'

import styles from './SettingsForm.module.scss'

const SettingsForm: FC = () => {
  const { control, handleSubmit, onCancel, onSubmit, errors } =
    useSettingsForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.block}>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>Your Name</FormLabel>
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
            errors={errors}
          />
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>Birthday</FormLabel>
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
          <FormLabel className={styles.label}>Your Email</FormLabel>
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
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>Bio</FormLabel>
          <Input
            name="bio"
            control={control}
            placeholder="Biography"
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
          <FormLabel className={styles.label}>Gender</FormLabel>
          <InputGender
            name="gender"
            control={control}
            className={styles.inputGender}
          />
        </div>
        <div className={styles.labelBlock}>
          <FormLabel className={styles.label}>Location</FormLabel>
          <Input
            name="location"
            control={control}
            placeholder="Location"
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
      <div className={styles.btnBlock}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}

export default SettingsForm
