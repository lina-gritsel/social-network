import { FC, MutableRefObject } from 'react'
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
  inputRef?: MutableRefObject<HTMLInputElement>
  errors?: FieldErrors<FormValues>
  className?: string
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  inputProps,
  name,
  control,
  errors,
  inputRef,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          className={className}
          inputRef={inputRef}
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
