import { useTranslation } from 'react-i18next'
import { InputAdornment } from '@mui/material'
import React, { FC, MutableRefObject } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'

import { FormValues } from './hooks'

import styles from './SettingsForm.module.scss'

interface AddAvatarModalProps {
  control: Control<any>
  handleClickAddBtn: () => void
  errors: FieldErrors<FormValues>
  inputRef: MutableRefObject<HTMLInputElement>
}

const AddAvatarModal: FC<AddAvatarModalProps> = ({
  errors,
  control,
  inputRef,
  handleClickAddBtn,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.addingImg}>
      <Input
        name="avatar"
        control={control}
        inputRef={inputRef}
        placeholder={t('addAvatar')}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddLinkOutlinedIcon />
            </InputAdornment>
          ),
        }}
        errors={errors}
      />
      <Button onClick={handleClickAddBtn}>
        {t('addImg').toLocaleUpperCase()}
      </Button>
    </div>
  )
}

export default AddAvatarModal
