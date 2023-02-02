import { FC } from 'react'
import Avatar from '@mui/material/Avatar'

import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'

import styles from './FriendsOnline.module.scss'

interface FriendsOnline {
  name: string
  avatarColor: string
  avatarImg?: string
  isOnline: boolean
}

const FriendsOnline: FC = () => {
  return (
    <div className={styles.block}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search Friends!"
      />
      <div className={styles.friends}>
        {friends.map((friend, i) => (
          <Friend key={i} {...friend} />
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
