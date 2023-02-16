import { FC } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { TextField } from '@mui/material'

import { FormValues } from '../../pages/RegistrationPage/RegistrationForm'

interface InputProps {
  type?: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  name: string
  control: Control<any>
  errors?: FieldErrors<FormValues>
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  inputProps,
  name,
  control,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value ?? ''}
          fullWidth
          placeholder={placeholder}
          type={type}
          InputProps={inputProps}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  )
}

export default Input
