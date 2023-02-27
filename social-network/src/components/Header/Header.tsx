import { FC } from 'react'
import { useSelector } from 'react-redux'
import { ForumRounded } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'
import { getUserInfoSelector } from '../../store/selectors'

import Avatar from '../Avatar'

import styles from './Header.module.scss'

const Header: FC = () => {
  const navigate = useNavigate()
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <div className={styles.content}>
      <Link to={PATHS.FEED} className={styles.mainMenuItem}>
        <ForumRounded className={styles.forum} />
        OurNetwork
      </Link>
      <div className={styles.avatarBlock}>
        <div className={styles.userName}>{userInfo?.name}</div>
        <Avatar
          imageUrl={userInfo?.avatar}
          className={styles.avatar}
          onClick={() => navigate(`${PATHS.PROFILE}/me`)}
        />
      </div>
    </div>
  )
}

export default Header
