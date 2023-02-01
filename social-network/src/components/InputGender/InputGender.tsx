import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

interface InputGenderProps {
  className: string
  name: string
  control: Control<any>
}

const InputGender: FC<InputGenderProps> = ({ className, name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field} row className={className} defaultValue="male">
          <FormControlLabel
            value="male"
            control={<Radio size="small" />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio size="small" />}
            label="Female"
          />
        </RadioGroup>
      )}
    />
  )
}

export default InputGender
