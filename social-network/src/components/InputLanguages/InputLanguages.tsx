import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { languages } from '../../i18next/constants'

import { useInputLanguages } from './hooks'

import styles from './InputLanguages.module.scss'

interface InputLanguagesProps {
  name: string
  control: Control<any>
}

const InputLanguages: FC<InputLanguagesProps> = ({ name, control }) => {
  const { changeLanguage, actualLanguage } = useInputLanguages()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box className={styles.box}>
          <FormControl fullWidth>
            <Select onChange={onChange} value={actualLanguage}>
              {Object.keys(languages).map((lng) => (
                <MenuItem
                  value={lng}
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                >
                  {languages[lng].nativeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    />
  )
}

export default InputLanguages
