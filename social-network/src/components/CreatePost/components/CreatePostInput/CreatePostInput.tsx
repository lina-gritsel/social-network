import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import styles from './CreatePostInput.module.scss'

interface CreatePostInputProps {
  onChange: any
  value: string
  className?: string
}

const CreatePostInput: FC<CreatePostInputProps> = ({
  onChange,
  value,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.input}>
      <textarea
        className={classNames(styles.textfield, className)}
        id="outlined-basic"
        value={value}
        onChange={onChange}
        placeholder={t('question')}
      />
    </div>
  )
}

export default CreatePostInput
