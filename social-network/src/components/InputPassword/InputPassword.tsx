import { FC } from 'react'
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

interface InputPasswordProps {
  type: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  name: string
  control: Control<any>
}

const InputPassword: FC<InputPasswordProps> = ({
  type,
  placeholder,
  inputProps,
  control,
  name,
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
        />
      )}
    />
  )
}

export default InputPassword
