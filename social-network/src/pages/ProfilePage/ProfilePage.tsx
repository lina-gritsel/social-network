import { FC, useState, useEffect, SyntheticEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@mui/material'

import NewsCreator from '../../components/NewsCreator'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { PATHS } from '../../router/paths'
import Modal from '../../components/Modal'

import { userNews } from '../NewsPage/NewsPageComponents/userNews'
import ModalContent from './ModalContent'
import { FIELD_INTO, BG_IMAGES } from './constants'

import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [bgImageArr, setBgImageArr] = useState<string[]>(BG_IMAGES)
  const [bgImage, setBgImage] = useState<string>(bgImageArr[0])

  const { t } = useTranslation()

  useEffect(() => {
    setBgImage(JSON.parse(window.localStorage.getItem('bgImage')))
    setBgImageArr(JSON.parse(window.localStorage.getItem('bgImageArr')))
  }, [])
  useEffect(() => {
    window.localStorage.setItem('bgImage', JSON.stringify(bgImage))
    window.localStorage.setItem('bgImageArr', JSON.stringify(bgImageArr))
  }, [bgImage, bgImageArr])

  const errorImg = (e: SyntheticEvent) => {
    setBgImageArr((prev) => prev.slice(0, -1))
    setIsErrorImg(true)
    const img = e.target as HTMLImageElement
    img.onerror = null
    setBgImage(BG_IMAGES[0])
    img.src = bgImage
  }

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
          <div className={styles.wrapper}>
            <div className={styles.userInfo}>
              <div className={styles.nameUser}>{userNews[4].username}</div>
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
            name={userNews[4].username}
            avatarImg={userNews[4].avatarImg}
            avatarColor={userNews[4].avatarColor}
          />
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage
