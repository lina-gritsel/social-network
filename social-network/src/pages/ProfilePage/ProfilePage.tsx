import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import CreatePost from '../../components/CreatePost'
import PostList from '../../components/PostsList'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Loader from '../../components/Loader'

import { parseUserData, useFetchProfileInfo } from './hooks'

import { useWallpaperModal } from './components/WallpapersModal/hooks'
import GeneralUserInfo from './components/GeneralUserInfo'
import { getUserInfoSelector } from '../../store/selectors'
import WallpapersModal from './components/WallpapersModal'
import UserDetails from './components/UserDetails'
import styles from './ProfilePage.module.scss'
import { DEFAULT_WALLPAPER } from './constants'

const ProfilePage: FC = () => {
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  const { t } = useTranslation()

  const { id: rawId } = useParams<{ id: string }>()

  const profileId = rawId === 'me' ? userId : rawId

  const isMyProfile = profileId === userId

  const { user, isLoading: isLoadingUserInfo } = useFetchProfileInfo(profileId)

  const rawUserInfo = useSelector(getUserInfoSelector)
  const profileInfoArr = isMyProfile
    ? parseUserData(rawUserInfo)
    : parseUserData(user)

  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)

  const userInfo = isMyProfile ? rawUserInfo : user
  const {
    isLoading,
    isErrorImg,
    wallpapers,
    onAddCurrentImage,
    currentImage,
    onSaveImage,
    visibleWallpapersModal,
    openWallpapersModal,
    closeWallpapersModal,
    onDeleteImage,
    onErrorImage,
    setIsErrorImg,
  } = useWallpaperModal(userInfo)

  return (
    <Layout>
      {isLoadingUserInfo || !userInfo ? (
        <Loader className={styles.loading} />
      ) : (
        <div className={styles.container}>
          <div className={styles.pofileHeader}>
            <div className={styles.wrapperCover}>
              <img
                className={styles.bgProfile}
                src={currentImage || DEFAULT_WALLPAPER}
                alt="background"
              />
              {isMyProfile && (
                <Button
                  className={styles.editCoverPhoto}
                  onClick={openWallpapersModal}
                >
                  {t('editCoverPhoto')}
                </Button>
              )}
            </div>
            <GeneralUserInfo
              userInfo={user}
              myInfo={rawUserInfo}
              isMyProfile={isMyProfile}
            />
          </div>
          <div className={styles.wrapperContent}>
            <UserDetails userInfo={profileInfoArr} userId={profileId}/>
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
      <WallpapersModal
        isLoading={isLoading}
        data={wallpapers}
        visible={visibleWallpapersModal}
        onClose={closeWallpapersModal}
        onAddCurrentImage={onAddCurrentImage}
        onSaveImage={onSaveImage}
        onDeleteImage={onDeleteImage}
        onErrorImage={onErrorImage}
        isErrorImg={isErrorImg}
        setIsErrorImg={setIsErrorImg}
      />
    </Layout>
  )
}

export default ProfilePage
