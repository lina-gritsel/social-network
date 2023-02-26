import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Modal from '../../components/Modal'

import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import PostList from '../../components/PostsList'
import CreatePost from '../../components/CreatePost'

import {
  chekingForFriends,
  parseUserData,
  useFetchProfileInfo,
  useProfilePage,
  useWallpapersModal,
} from './hooks'
import ModalContent from './ModalContent'
import { DEFAULT_WALLPAPER } from './constants'

import styles from './Profile.module.scss'
import UserDetails from './components/UserDetails'
import GeneralUserInfo from './components/GeneralUserInfo'
import { useSelector } from 'react-redux'
import { getUserInfoSelector } from '../../store/selectors'

const ProfilePage: FC = () => {
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const { t } = useTranslation()

  const { id: rawId } = useParams<{ id: string }>()

  const profileId = rawId === 'me' ? userId : rawId

  const isMyProfile = profileId === userId

  const { user, isLoading: isLoadingUserInfo } = useFetchProfileInfo(profileId)

  const {
    isLoading,
    bgImage,
    bgImageArr,
    isErrorImg,
    onLoadImg,
    errorImg,
    setBgImage,
    setBgImageArr,
    setIsErrorImg,
  } = useProfilePage()

  const rawUserInfo = useSelector(getUserInfoSelector)
  const profileInfoArr = isMyProfile
    ? parseUserData(rawUserInfo)
    : parseUserData(user)

  const { isFollowing, setIsFollowing } = chekingForFriends(rawUserInfo, user)

  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)

  const userInfo = isMyProfile ? rawUserInfo : user

  const {
    visible: visibleWallpapersModal,
    open: openWallpapersModal,
    close: closeWallpapersModal,
  } = useWallpapersModal()

  return (
    <Layout>
      <Modal
        open={visibleWallpapersModal}
        onClose={closeWallpapersModal}
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
      {isLoadingUserInfo || !userInfo ? (
        <Loader className={styles.loading} />
      ) : (
        <div className={styles.container}>
          <div className={styles.pofileHeader}>
            <div className={styles.wrapperCover}>
              <img
                className={styles.bgProfile}
                src={
                  isMyProfile ? bgImage : user.background || DEFAULT_WALLPAPER
                }
                alt="background"
                onError={(e) => errorImg(e)}
                onLoad={(e) => isMyProfile && onLoadImg(e)}
              />
              {isMyProfile && (
                <Button
                  className={styles.editCoverPhoto}
                  onClick={() => {
                    openWallpapersModal()
                    setIsErrorImg(false)
                  }}
                >
                  {t('editCoverPhoto')}
                </Button>
              )}
            </div>
            <GeneralUserInfo
              userInfo={user}
              isMyProfile={isMyProfile}
              isFollowing={isFollowing}
              isLoading={isLoading}
            />
          </div>
          <div className={styles.wrapperContent}>
            <UserDetails userInfo={profileInfoArr} />
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
      )}
    </Layout>
  )
}

export default ProfilePage
