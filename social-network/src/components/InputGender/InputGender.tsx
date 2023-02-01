import { FC } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

interface InputGenderProps {
  className: string
}

const InputGender: FC<InputGenderProps> = ({ className }) => {
  return (
    <RadioGroup row className={className} defaultValue="male">
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
  )
}

export default InputGender
