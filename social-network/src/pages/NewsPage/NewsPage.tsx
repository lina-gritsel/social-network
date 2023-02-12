import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import FriendsOnline from '../../components/FriendsOnline'
import RandomFriend from '../../components/RandomFriend'
import NewsCreator from '../../components/NewsCreator'
import NewsCard from '../../components/NewsCard'
import { getAllPosts } from '../../api/request'
import Layout from '../../components/Layout'
import Weather from '../../components/Weather'
import {
  getRandomColor,
  dateConversion,
  sortNews,
} from '../../constants/constants'
import { userNews } from './NewsPageComponents/userNews'
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

  const owner = userNews[4]

  return (
    <Layout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.news}>
            <NewsCreator
              setIsAllPosts={setIsAllPosts}
              name={owner.username}
              avatarColor={owner.avatarColor}
              avatarImg={owner.avatarImg}
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
