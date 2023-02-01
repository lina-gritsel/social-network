import { FC } from 'react'
import { TextField } from '@mui/material'

interface InputProps {
  type: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
}

const Input: FC<InputProps> = ({ type, placeholder, inputProps }) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      type={type}
      InputProps={inputProps}
    />
  )
}

export default Input
