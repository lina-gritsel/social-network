import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoSelector } from '../../store/selectors'
import FriendsOnline from '../../components/FriendsOnline'
import RandomFriend from '../../components/RandomFriend'
import CreatePost from '../../components/CreatePost'
import NewsList from '../../components/NewsList'
import Weather from '../../components/Weather'
import Layout from '../../components/Layout'

import { useFetchAllUsers } from './hooks'

import styles from './NewsPage.module.scss'



const NewsPage: FC = () => {
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  const { isLoading, users } = useFetchAllUsers()
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
            />
            <NewsList isAllPosts={isAllPosts} />
          </div>
          <div className={styles.friendAndWeather}>
            <RandomFriend allUsers={users} isLoading={isLoading} />
            <Weather />
          </div>
        </div>
        <FriendsOnline allUsers={users} isLoading={isLoading} />
      </div>
    </Layout>
  )
}

export default NewsPage