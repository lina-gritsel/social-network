import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { languages } from '../../i18next/constants'

import { useInputLanguages } from './hooks'

import styles from './InputLanguages.module.scss'

const InputLanguages: FC = () => {
  const { changeLanguage, actualLanguage } = useInputLanguages()

  return (
    <Box className={styles.box}>
      <FormControl fullWidth>
        <Select value={actualLanguage}>
          {Object.keys(languages).map((lng) => (
            <MenuItem value={lng} key={lng} onClick={() => changeLanguage(lng)}>
              {languages[lng].nativeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default InputLanguages
