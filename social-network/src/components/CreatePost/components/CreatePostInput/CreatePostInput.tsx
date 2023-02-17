import { FC } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

import styles from './CreatePostInput.module.scss'

interface CreatePostInputProps {
  onChange: any
  value: string
}

const CreatePostInput: FC<CreatePostInputProps> = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.input}>
      <TextField
        className={styles.field}
        id="outlined-basic"
        variant="outlined"
        sx={{
          '& fieldset': { border: 'none' },
        }}
        value={value}
        onChange={onChange}
        label={t('question')}
      />
    </div>
  )
}

export default CreatePostInput