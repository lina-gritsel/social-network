import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AccountCircle } from '@mui/icons-material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import {
  FormLabel,
  InputAdornment,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material'

import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import InputDate from '../../../components/InputDate'
import InputGender from '../../../components/InputGender'

import { useSettingsForm } from './hooks'
import AddAvatarModal from './AddAvatarModal'

import styles from './SettingsForm.module.scss'

const SettingsForm: FC = () => {
  const { t } = useTranslation()

  const {
    img,
    open,
    errors,
    control,
    userInfo,
    inputRef,
    isLoading,
    onSubmit,
    onCancel,
    handleOpen,
    handleClose,
    handleSubmit,
    handleClickAddBtn,
  } = useSettingsForm()

  if (isLoading || !userInfo) {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Modal
        open={open}
        onClose={handleClose}
        title={t('changeAvatar')}
        content={
          <AddAvatarModal
            errors={errors}
            control={control}
            inputRef={inputRef}
            handleClickAddBtn={handleClickAddBtn}
          />
        }
        isDialogActions={false}
      />
      <div className={styles.avatarBlock}>
        <Avatar
          alt="avatar"
          src={img || userInfo?.avatar}
          className={styles.profileAvatar}
        >
          {userInfo?.name?.charAt(0)}
        </Avatar>
        <div className={styles.editAvatar} onClick={handleOpen}>
          <CloudDownloadOutlinedIcon />
        </div>
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
      <div className={styles.btnBlock}>
        <Button className={styles.cancelBtn} outlined onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button type="submit">{t('save')}</Button>
      </div>
    </form>
  )
}

export default SettingsForm
