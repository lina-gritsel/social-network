import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, CircularProgress } from '@mui/material'

import { User } from '../../api'
import { PATHS } from '../../router/paths'

import InputSearch from '../InputSearch'
import { useDebounce } from '../../hooks/useDebounce'

import styles from './FriendsOnline.module.scss'
import Avatar from '../Avatar'

interface Friends {
  id: string
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

const Friend: FC<Friends> = ({ name, avatar, id }) => {
  return (
    <div className={styles.friend}>
      <NavLink to={`${PATHS.PROFILE}/${id}`}>
        <div className={styles.name}>
          <Avatar imageUrl={avatar} />
          <p>{name}</p>
        </div>
      </NavLink>
    </div>
  )
}
export default FriendsOnline
