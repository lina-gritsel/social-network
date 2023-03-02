import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import { User } from '../../api'
import { PATHS } from '../../router/paths'

import Avatar from '../Avatar'

import styles from './FriendsOnlineMobile.module.scss'

interface Friends {
  id: string
  name: string
  avatar?: string
}

interface FriendsOnlineMobileProps {
  allUsers: User[]
  isLoading: boolean
}

const FriendsOnlineMobile: FC<FriendsOnlineMobileProps> = ({
  allUsers,
  isLoading,
}) => {
  return (
    <>
      {isLoading && (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      )}
      <div className={styles.friends}>
        {allUsers.map((friend, index) => (
          <FriendOnline key={index} {...friend} />
        ))}
      </div>
    </>
  )
}

const FriendOnline: FC<Friends> = ({ name, avatar, id }) => {
  return (
    <NavLink to={`${PATHS.PROFILE}/${id}`}>
      <div className={styles.friend}>
        <Avatar imageUrl={avatar} />
        <p className={styles.name}>{name}</p>
      </div>
    </NavLink>
  )
}

export default FriendsOnlineMobile
