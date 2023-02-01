import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface InputProps {
  type?: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  name: string
  control: Control<any>
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  inputProps,
  name,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          placeholder={placeholder}
          type={type}
          InputProps={inputProps}
        />
      )}
    />
  )
}

export default Input
