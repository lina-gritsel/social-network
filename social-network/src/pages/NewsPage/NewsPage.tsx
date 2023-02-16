import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from '../../components/Layout'
import Weather from '../../components/Weather'
import NewsCreator from '../../components/NewsCreator'
import RandomFriend from '../../components/RandomFriend'
import FriendsOnline from '../../components/FriendsOnline'
import { getUserInfoSelector } from '../../store/selectors'
import {
  getRandomColor,
} from '../../constants/constants'
import { News } from '../../components/NewsCard/NewsCard'

import styles from './NewsPage.module.scss'
import NewsList from '../../components/NewsList'

export const setAvatarColor = (arr: News[]) => {
  return arr.map((news) =>
    Object.assign(news, { avatarColor: getRandomColor() }),
  )
}

const NewsPage: FC = () => {
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  
  const userInfo = useSelector(getUserInfoSelector)

  return (
    <Layout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.news}>
            <NewsCreator
              setIsAllPosts={setIsAllPosts}
              name={userInfo?.name}
              avatarImg={userInfo?.avatar}
            />
            <NewsList isAllPosts={isAllPosts} />
          </div>
          <div className={styles.friendAndWeather}>
            <RandomFriend />
            <Weather />
          </div>
        </div>
        <FriendsOnline />
      </div>
    </Layout>
  )
}

export default NewsPage
