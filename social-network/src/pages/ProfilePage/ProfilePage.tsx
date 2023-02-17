import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Modal from '../../components/Modal'
import Layout from '../../components/Layout'
import Button from '../../components/Button'

import CreatePost from '../../components/CreatePost'
import NewsList from '../../components/NewsList'
import { PATHS } from '../../router/paths'

import { useProfilePage } from './hooks'
import { FIELD_INTO } from './constants'
import ModalContent from './ModalContent'

import styles from './Profile.module.scss'
import Avatar from '../../components/Avatar'

const ProfilePage: FC = () => {
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  const { t } = useTranslation()
  const {
    isOpen,
    bgImage,
    userInfo,
    bgImageArr,
    isErrorImg,
    profileInfoArr,
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
        isDialogActions={false}
        content={
          <ModalContent
            setBgImage={setBgImage}
            isErrorImg={isErrorImg}
            setIsErrorImg={setIsErrorImg}
            bgImageArr={bgImageArr}
            setBgImageArr={setBgImageArr}
          />
        }
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
            imageUrl={userInfo?.avatar}
            className={styles.profileAvatar}
          />
          <div className={styles.wrapperInfoUser}>
            <div className={styles.userInfo}>
              <div className={styles.nameUser}>{userInfo?.name}</div>
              <div className={styles.workUser}>{userInfo?.bio}</div>
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
                <div className={styles.profileInfo}>
                  {profileInfoArr[index]}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.content}>
            <CreatePost
              name={userInfo?.name}
              avatarImg={userInfo?.avatar}
              setIsAllPosts={setIsAllPosts}
            />
            <NewsList
              isAllPosts={isAllPosts}
              filter={true}
              name={userInfo?.name}
              isProfilePage={true}
              setIsAllPosts={setIsAllPosts}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage