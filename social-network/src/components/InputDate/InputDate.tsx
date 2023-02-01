import { FC } from 'react'
import { TextField } from '@mui/material'

interface InputDateProps {
  type: string
  placeholder: string
  inputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  className?: string
}

const InputDate: FC<InputDateProps> = ({
  type,
  placeholder,
  inputProps,
  className,
}) => {
  return (
    <TextField
      type={type}
      className={className}
      placeholder={placeholder}
      InputProps={inputProps}
    />
  )
}

export default InputDate
