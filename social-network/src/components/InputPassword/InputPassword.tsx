import { FC } from 'react'
import { TextField } from '@mui/material'

interface InputPasswordProps {
  type: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
}

const InputPassword: FC<InputPasswordProps> = ({
  type,
  placeholder,
  inputProps,
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      placeholder={placeholder}
      InputProps={inputProps}
    />
  )
}

export default InputPassword
