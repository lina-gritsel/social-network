import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import styles from './InputLanguages.module.scss'

interface InputLanguagesProps {
  name: string
  control: Control<any>
}

const InputLanguages: FC<InputLanguagesProps> = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box className={styles.box}>
          <FormControl fullWidth>
            <Select onChange={onChange} defaultValue="english">
              <MenuItem value={'english'}>English</MenuItem>
              <MenuItem value={'spanish'}>Español</MenuItem>
              <MenuItem value={'russian'}>Русский</MenuItem>
              <MenuItem value={'сhinese'}>中國人</MenuItem>
              <MenuItem value={'hindi'}>हिंदी</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    />
  )
}

export default InputLanguages
