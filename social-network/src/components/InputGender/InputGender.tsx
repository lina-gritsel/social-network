import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, Controller } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

interface InputGenderProps {
  className: string
  name: string
  control: Control<any>
}

const InputGender: FC<InputGenderProps> = ({ className, name, control }) => {
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <RadioGroup
          onChange={onChange}
          row
          className={className}
          defaultValue="male"
        >
          <FormControlLabel
            value="male"
            control={<Radio size="small" />}
            label={t('male')}
          />
          <FormControlLabel
            value="female"
            control={<Radio size="small" />}
            label={t('female')}
          />
        </RadioGroup>
      )}
    />
  )
}

export default InputGender
