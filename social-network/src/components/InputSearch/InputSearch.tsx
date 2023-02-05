import { FC, ChangeEventHandler } from 'react'

import styles from './InputSearch.module.scss'

interface Search {
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const InputSearch: FC<Search> = ({ placeholder, onChange }) => {
  return (
    <input
      type="search"
      className={styles.searchInput}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default InputSearch
