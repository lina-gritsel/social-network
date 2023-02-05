import { Avatar } from '@mui/material'
import { FC } from 'react'

import NewsCreator from '../../components/NewsCreator'
import Button from '../../components/Button'

import { userNews } from '../NewsPage/NewsPageComponents/userNews'
import { FIELD_INTO } from './constants'

import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const bgImage =
    'https://images.unsplash.com/photo-1450387635522-8ecb968079bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2017&q=80'
  return (
    <div className={styles.container}>
      <div className={styles.pofileHeader}>
        <div className={styles.wrapperCover}>
          <img className={styles.bgProfile} src={bgImage} alt="" />
          <Button className={styles.editCoverPhoto}>Edit cover photo</Button>
        </div>
        <Avatar
          alt="Remy Sharp"
          src={userNews[4].avatarImg}
          className={styles.profileAvatar}
        />
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <div className={styles.nameUser}>{userNews[4].name}</div>
            <div className={styles.workUser}> UI Designer</div>
          </div>
          <Button className={styles.editInfo}>Edit basic info</Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.intro}>
          <div className={styles.title}>intro</div>
          {FIELD_INTO.map(({ icon, label }, index) => (
            <div key={index} className={styles.intoItem}>
              {icon}
              <div>{label}</div>
            </div>
          ))}
        </div>
        <NewsCreator
          name={userNews[4].name}
          avatarImg={userNews[4].avatarImg}
          avatarColor={userNews[4].avatarColor}
        />
      </div>
    </div>
  )
}

export default ProfilePage
