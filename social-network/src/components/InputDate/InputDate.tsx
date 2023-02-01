import { FC } from 'react'
import { Controller, Control } from 'react-hook-form'
import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

interface InputDateProps {
  className?: string
  name: string
  control: Control<any>
}

const InputDate: FC<InputDateProps> = ({ className, control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label="Date of birth"
            className={className}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default InputDate
