import { FC, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Modal from '../../components/Modal'
import { PATHS } from '../../router/paths'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Avatar from '../../components/Avatar'
import PostList from '../../components/PostsList'
import CreatePost from '../../components/CreatePost'

import { useFetchProfileInfo, useProfilePage } from './hooks'
import ModalContent from './ModalContent'
import {
  FIELD_INTO,
  FIRST_LINKS_INDEX,
  LAST_LINKS_INDEX,
  LINKS,
  DEFAULT_WALLPAPER,
} from './constants'

import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const { t } = useTranslation()

  const { id: profileId } = useParams<{ id: string }>()
  const {
    user,
    isLoading: isLoadingUserInfo,
    userProfileInfoArr,
  } = useFetchProfileInfo(profileId)
  const {
    isOpen,
    isLoading,
    bgImage,
    userInfo: rawUserInfo,
    bgImageArr,
    isErrorImg,
    profileInfoArr: rawProfileInfoArr,
    onLoadImg,
    errorImg,
    setIsOpen,
    setBgImage,
    setBgImageArr,
    setIsErrorImg,
  } = useProfilePage()

  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)

  const isMyProfile = profileId === 'me'

  const userInfo = isMyProfile ? rawUserInfo : user
  const profileInfoArr = isMyProfile ? rawProfileInfoArr : userProfileInfoArr

  if (isLoadingUserInfo || !userInfo)
    return <Loader className={styles.loading} />

  return (
    <Layout>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title={t('backgroundTitle')}
        isDialogActions={false}
        className={styles.dialogContent}
        content={
          <ModalContent
            setBgImage={setBgImage}
            isErrorImg={isErrorImg}
            setIsErrorImg={setIsErrorImg}
            bgImageArr={bgImageArr}
            setBgImageArr={setBgImageArr}
            isLoading={isLoading}
          />
        }
      />
      <div className={styles.container}>
        <div className={styles.pofileHeader}>
          <div className={styles.wrapperCover}>
            <img
              className={styles.bgProfile}
              src={isMyProfile ? bgImage : user.background || DEFAULT_WALLPAPER}
              alt="background"
              onError={(e) => errorImg(e)}
              onLoad={(e) => isMyProfile && onLoadImg(e)}
            />
            {isMyProfile && (
              <Button
                className={styles.editCoverPhoto}
                onClick={() => {
                  setIsOpen(true)
                  setIsErrorImg(false)
                }}
              >
                {t('editCoverPhoto')}
              </Button>
            )}
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
            {isMyProfile && (
              <NavLink to={PATHS.SETTINGS}>
                <Button className={styles.editInfo}>{t('settings')}</Button>
              </NavLink>
            )}
          </div>
        </div>
        <div className={styles.wrapperContent}>
          <div className={styles.intro}>
            <div className={styles.title}>{t('intro')}</div>
            {FIELD_INTO.map(({ icon, label }, index) =>
              index >= FIRST_LINKS_INDEX && index <= LAST_LINKS_INDEX ? (
                <a
                  key={index}
                  href={LINKS[label] + (profileInfoArr[index] || '')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.intoItem}>
                    <Field
                      icon={icon}
                      label={label}
                      profileInfo={profileInfoArr[index]}
                    />
                  </div>
                </a>
              ) : (
                <div key={index} className={styles.intoItem}>
                  <Field
                    icon={icon}
                    label={label}
                    profileInfo={profileInfoArr[index]}
                  />
                </div>
              ),
            )}
          </div>
          <div className={styles.content}>
            {isMyProfile && (
              <CreatePost
                name={userInfo?.name}
                userId={userInfo?.id}
                avatarImg={userInfo?.avatar}
                setIsAllPosts={setIsAllPosts}
                className={styles.postInput}
              />
            )}
            <PostList
              isAllPosts={isAllPosts}
              filterPostsForProfilePage
              filterId={userInfo?.id}
              isProfilePage={isMyProfile}
              setIsAllPosts={setIsAllPosts}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface FieldProps {
  icon: JSX.Element
  label: string
  profileInfo: string | string[]
}

const Field: FC<FieldProps> = ({ icon, label, profileInfo }) => {
  const { t } = useTranslation()

  return (
    <>
      {icon}
      <div>{t(label)}</div>
      <div className={styles.profileInfo}>{profileInfo}</div>
    </>
  )
}

export default ProfilePage
