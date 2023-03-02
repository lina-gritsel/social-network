import { FC, ChangeEventHandler } from 'react'
import SearchIcon from '@mui/icons-material/Search'

import styles from './InputSearch.module.scss'

interface Search {
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const InputSearch: FC<Search> = ({ placeholder, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <SearchIcon className={styles.searchIcon}/>
      <input
        type="search"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default InputSearch
