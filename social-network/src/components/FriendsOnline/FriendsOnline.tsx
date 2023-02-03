import { FC, useState } from 'react'
import Avatar from '@mui/material/Avatar'

import useDebounce from '../hooks/useDebounce'
import InputSearch from '../InputSearch'
import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'

import styles from './FriendsOnline.module.scss'

interface FriendsOnline {
  name: string
  avatarColor: string
  avatarImg?: string
  isOnline: boolean
}

const FriendsOnline: FC = () => {
  const [search, setSearch] = useState<string>('')

  const searchDebounced = useDebounce(search, 500)

  return (
    <div className={styles.block}>
      <InputSearch
        placeholder="Search Friends!"
        onChange={(e) => setSearch(e.target.value.trim().toLocaleLowerCase())}
      />
      <div className={styles.friends}>
        {friends
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

const Friend: FC<FriendsOnline> = ({
  name,
  avatarColor,
  avatarImg,
  isOnline,
}) => {
  return (
    <div className={styles.friend}>
      <div className={styles.name}>
        <Avatar
          sx={{ bgcolor: avatarColor }}
          aria-label="recipe"
          src={avatarImg}
        >
          {name[0]}
        </Avatar>
        <p>{name}</p>
      </div>
      {isOnline ? (
        <span className={styles.online}></span>
      ) : (
        <span>offline</span>
      )}
    </div>
  )
}
export default FriendsOnline
