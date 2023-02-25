import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import FriendsOnline from '../../components/FriendsOnline'
import { RandomFriend, BirthdayFriend } from '../../components/RandomFriend'
import CreatePost from '../../components/CreatePost'
import PostsList from '../../components/PostsList'
import Weather from '../../components/Weather'
import Layout from '../../components/Layout'

import { useNewsPage } from './hooks'

import styles from './FeedPage.module.scss'

const FeedPage: FC = () => {
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  const { isLoading, userswWithoutMe } = useNewsPage()
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <Layout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.news}>
            <CreatePost
              setIsAllPosts={setIsAllPosts}
              name={userInfo?.name}
              userId={userInfo?.id}
              avatarImg={userInfo?.avatar}
              className={styles.postInput}
            />
            <PostsList isAllPosts={isAllPosts} />
          </div>
          <div className={styles.friendAndWeather}>
            <RandomFriend allUsers={userswWithoutMe} isLoading={isLoading} />
            <BirthdayFriend allUsers={userswWithoutMe} isLoading={isLoading} />
            <Weather />
          </div>
        </div>
        <FriendsOnline allUsers={userswWithoutMe} isLoading={isLoading} />
      </div>
    </Layout>
  )
}

export default FeedPage
