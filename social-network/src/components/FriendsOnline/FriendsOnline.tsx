import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, CircularProgress } from '@mui/material'

import { User } from '../../api'

import InputSearch from '../InputSearch'
import useDebounce from './hooks'

import styles from './FriendsOnline.module.scss'
import Avatar from '../Avatar'

interface Friends {
  name: string
  avatar?: string
}
interface FriendsOnlineProps {
  allUsers: User[]
  isLoading: boolean
}

const FriendsOnline: FC<FriendsOnlineProps> = ({ allUsers, isLoading }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')

  const searchDebounced = useDebounce(search, 500)

  return (
    <div className={styles.block}>
      <InputSearch
        placeholder={t('searchFriends')}
        onChange={(e) => setSearch(e.target.value.trim().toLocaleLowerCase())}
      />
      {isLoading && (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      )}

      <div className={styles.friends}>
        {allUsers
          .filter(({ name }) =>
            name.toLocaleLowerCase().includes(searchDebounced),
          )
          .map((friend, index) => (
            <Friend key={index} {...friend} />
          ))}
      </div>
    </div>
  )
}

const Friend: FC<Friends> = ({ name, avatar }) => {
  return (
    <div className={styles.friend}>
      <div className={styles.name}>
        <Avatar imageUrl={avatar} />
        <p>{name}</p>
      </div>
    </div>
  )
}
export default FriendsOnline
