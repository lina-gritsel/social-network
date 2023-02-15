import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputAdornment } from '@mui/material'
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import styles from './SettingsForm.module.scss'

const AddAvatarModal = ({ control, errors, handleClickAddBtn, inputRef }) => {
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
