import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputSearch from '../../../../components/InputSearch'

import styles from './FriendsList.module.scss'

const FriendsList: FC = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')

  return (
    <div className={styles.myFriends}>
      <InputSearch
        placeholder={t('searchFriends')}
        onChange={(e) => setSearch(e.target.value.trim().toLocaleLowerCase())}
      />
    </div>
  )
}

export default FriendsList
