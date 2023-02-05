import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@mui/material'

import NewsCreator from '../../components/NewsCreator'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { PATHS } from '../../router/paths'

import { userNews } from '../NewsPage/NewsPageComponents/userNews'
import { FIELD_INTO } from './constants'

import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const { t } = useTranslation()
  const bgImage =
    'https://images.unsplash.com/photo-1450387635522-8ecb968079bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2017&q=80'

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pofileHeader}>
          <div className={styles.wrapperCover}>
            <img className={styles.bgProfile} src={bgImage} alt="" />
            <Button className={styles.editCoverPhoto}>
              {t('editCoverPhoto')}
            </Button>
          </div>
          <Avatar
            alt="Remy Sharp"
            src={userNews[4].avatarImg}
            className={styles.profileAvatar}
          />
          <div className={styles.wrapper}>
            <div className={styles.userInfo}>
              <div className={styles.nameUser}>{userNews[4].name}</div>
              <div className={styles.workUser}>UI Designer</div>
            </div>
            <NavLink to={PATHS.SETTINGS}>
              <Button className={styles.editInfo}>{t('settings')}</Button>
            </NavLink>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.intro}>
            <div className={styles.title}>{t('intro')}</div>
            {FIELD_INTO.map(({ icon, label }, index) => (
              <div key={index} className={styles.intoItem}>
                {icon}
                <div>{t(label)}</div>
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
    </Layout>
  )
}

export default ProfilePage
