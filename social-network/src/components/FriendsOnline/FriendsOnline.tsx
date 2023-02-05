import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'

import { friends } from '../../pages/NewsPage/NewsPageComponents/userNews'

import InputSearch from '../InputSearch'
import useDebounce from './hooks'

import styles from './FriendsOnline.module.scss'

interface FriendsOnline {
  name: string
  avatarColor: string
  avatarImg?: string
  isOnline: boolean
}

const FriendsOnline: FC = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')

  const searchDebounced = useDebounce(search, 500)

  return (
    <div className={styles.block}>
      <InputSearch
        placeholder={t('searchFriends')}
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
  const { t } = useTranslation()

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
        <span>{t('offline')}</span>
      )}
    </div>
  )
}
export default FriendsOnline
