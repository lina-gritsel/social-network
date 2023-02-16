import { FC } from 'react'
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../router/paths'
import Modal from '../../components/Modal'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import NewsCreator from '../../components/NewsCreator'

import { useProfilePage } from './hooks'
import { FIELD_INTO } from './constants'
import ModalContent from './ModalContent'
import { userNews } from '../NewsPage/NewsPageComponents/userNews'

import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const { t } = useTranslation()
  const {
    isOpen,
    bgImage,
    userInfo,
    bgImageArr,
    isErrorImg,
    errorImg,
    setIsOpen,
    setBgImage,
    setBgImageArr,
    setIsErrorImg,
  } = useProfilePage()

  return (
    <Layout>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title={t('backgroundTitle')}
        content={
          <ModalContent
            setBgImage={setBgImage}
            isErrorImg={isErrorImg}
            setIsErrorImg={setIsErrorImg}
            bgImageArr={bgImageArr}
            setBgImageArr={setBgImageArr}
          />
        }
        isDialogActions={false}
      />
      <div className={styles.container}>
        <div className={styles.pofileHeader}>
          <div className={styles.wrapperCover}>
            <img
              className={styles.bgProfile}
              src={bgImage}
              alt="background"
              onError={(e) => errorImg(e)}
            />
            <Button
              className={styles.editCoverPhoto}
              onClick={() => {
                setIsOpen(true)
                setIsErrorImg(false)
              }}
            >
              {t('editCoverPhoto')}
            </Button>
          </div>
          <Avatar
            alt="Remy Sharp"
            src={userNews[4].avatarImg}
            className={styles.profileAvatar}
          />
          <div className={styles.wrapperInfoUser}>
            <div className={styles.userInfo}>
              <div className={styles.nameUser}>{userNews[4].name}</div>
              <div className={styles.workUser}>UI Designer</div>
            </div>
            <NavLink to={PATHS.SETTINGS}>
              <Button className={styles.editInfo}>{t('settings')}</Button>
            </NavLink>
          </div>
        </div>
        <div className={styles.wrapperContent}>
          <div className={styles.intro}>
            <div className={styles.title}>{t('intro')}</div>
            {FIELD_INTO.map(({ icon, label }, index) => (
              <div key={index} className={styles.intoItem}>
                {icon}
                <div>{t(label)}</div>
              </div>
            ))}
          </div>
          <div className={styles.content}>
            <NewsCreator
              name={userNews[4].name}
              avatarImg={userNews[4].avatarImg}
              avatarColor={userNews[4].avatarColor}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage
