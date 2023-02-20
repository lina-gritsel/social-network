import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'
import { getUserInfoSelector } from '../../store/selectors'
import Avatar from '../Avatar'

import styles from './Header.module.scss'

const Header: FC = () => {
  const navigate = useNavigate()
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <div className={styles.content}>
      <div className={styles.userName}>{userInfo?.name}</div>
      <Avatar
        imageUrl={userInfo?.avatar}
        className={styles.avatar}
        onClick={() => navigate(PATHS.PROFILE)}
      />
    </div>
  )
}

export default Header
