import { FC } from 'react'
import { TextField } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'

import { FormValues } from '../../pages/RegistrationPage/RegistrationForm'

interface InputPasswordProps {
  type: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  name: string
  control: Control<any>
  errors?: FieldErrors<FormValues>
}

const InputPassword: FC<InputPasswordProps> = ({
  type,
  placeholder,
  inputProps,
  control,
  name,
  errors
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          placeholder={placeholder}
          InputProps={inputProps}
          error={errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  )
}

export default InputPassword
