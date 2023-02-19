import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FormLabel, InputAdornment, Avatar } from '@mui/material'
import {
  Twitter,
  Facebook,
  Instagram,
  LocationOn,
  AutoStories,
  AlternateEmail,
  CloudDownloadOutlined,
  AccountCircle,
} from '@mui/icons-material'

import Modal from '../../../../components/Modal'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import Loader from '../../../../components/Loader'
import InputDate from '../../../../components/InputDate'
import InputGender from '../../../../components/InputGender'

import { useSettingsForm } from './hooks'
import AddAvatarModal from './AddAvatarModal'

import styles from './SettingsForm.module.scss'

const SettingsForm: FC = () => {
  const { t } = useTranslation()

  const {
    img,
    errors,
    control,
    userInfo,
    inputRef,
    isLoading,
    visibleAvatarModal,
    onSubmit,
    onCancel,
    handleSubmit,
    openAvatarModal,
    closeAvatarModal,
    handleClickAddBtn,
  } = useSettingsForm()

  if (isLoading || !userInfo) return <Loader className={styles.loading} />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Modal
        open={visibleAvatarModal}
        onClose={closeAvatarModal}
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
        />
        <CloudDownloadOutlined
          className={styles.editAvatar}
          onClick={openAvatarModal}
        />
      </div>
      <div className={styles.block}>
        <SettingField label={t('nickname')}>
          <Input
            name="name"
            control={control}
            placeholder={t('nickname')}
            inputProps={adornmentInputProps({ icon: <AccountCircle /> })}
            errors={errors}
          />
        </SettingField>
        <SettingField label={t('birthday')}>
          <InputDate
            className={styles.inputDate}
            name="date"
            placeholder={t('birthday')}
            control={control}
            errors={errors}
          />
        </SettingField>
      </div>
      <div className={styles.block}>
        <SettingField label={t('email')}>
          <Input
            name="email"
            control={control}
            placeholder={t('email')}
            type="email"
            inputProps={adornmentInputProps({ icon: <AlternateEmail /> })}
            errors={errors}
          />
        </SettingField>
        <SettingField label={t('bio')}>
          <Input
            name="bio"
            control={control}
            placeholder={t('bio')}
            inputProps={adornmentInputProps({ icon: <AutoStories /> })}
            errors={errors}
          />
        </SettingField>
      </div>
      <div className={styles.block}>
        <SettingField label={t('gender')}>
          <InputGender
            name="gender"
            control={control}
            className={styles.inputGender}
          />
        </SettingField>
        <SettingField label={t('location')}>
          <Input
            name="location"
            control={control}
            placeholder={t('location')}
            inputProps={adornmentInputProps({ icon: <LocationOn /> })}
            errors={errors}
          />
        </SettingField>
      </div>

      <h2 className={styles.title}>{t('socialLinks')}</h2>
      <div className={styles.block}>
        <SettingField label={t('facebook')}>
          <Input
            name="facebook"
            control={control}
            placeholder={t('facebook')}
            inputProps={adornmentInputProps({ icon: <Facebook /> })}
            errors={errors}
          />
        </SettingField>
        <SettingField label={t('twitter')}>
          <Input
            name="twitter"
            control={control}
            placeholder={t('twitter')}
            inputProps={adornmentInputProps({ icon: <Twitter /> })}
            errors={errors}
          />
        </SettingField>
        <SettingField label={t('instagram')}>
          <Input
            name="instagram"
            control={control}
            placeholder={t('instagram')}
            inputProps={adornmentInputProps({ icon: <Instagram /> })}
            errors={errors}
          />
        </SettingField>
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

export const adornmentInputProps = ({
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

const SettingField = ({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) => {
  return (
    <div className={styles.labelBlock}>
      <FormLabel className={styles.label}>{label}</FormLabel>
      {children}
    </div>
  )
}
