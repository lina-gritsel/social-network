import { FC } from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { FormValues } from '../../pages/RegistrationPage/RegistrationForm'

interface InputDateProps {
  className?: string
  name: string
  control: Control<any>
  errors?: FieldErrors<FormValues>
}

const InputDate: FC<InputDateProps> = ({
  className,
  control,
  name,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            className={className}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors[name]}
                helperText={
                  errors[name]?.message ? 'Date is a required field' : ''
                }
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default InputDate
