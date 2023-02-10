import { FC, useState, useEffect } from 'react'

import Layout from '../../components/Layout'
import NewsCard from '../../components/NewsCard'
import NewsCreator from '../../components/NewsCreator'
import FriendsOnline from '../../components/FriendsOnline'
import Weather from '../../components/Weather'
import { getRandomColor, dateConversion, sortNews } from '../../constants/constants'

import { userNews } from './NewsPageComponents/userNews'
import { getAllPosts } from '../../api/request'
import { News } from '../../components/NewsCard/NewsCard'

import styles from './NewsPage.module.scss'
import RandomFriend from '../../components/RandomFriend'

const setAvatarColor = (arr: News[]) => {
  return arr.map((news) =>
    Object.assign(news, { avatarColor: getRandomColor() }),
  )
}


const NewsPage: FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [render, setRender] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const posts: News[] = (await getAllPosts()).posts
      posts
        .sort((a, b) => sortNews(a.createdAt, b.createdAt))
        .map((post) => (post.createdAt = dateConversion(post.createdAt)))
      setNews(setAvatarColor(posts))
    })()
  }, [render])

  const owner = userNews[4]

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.news}>
          <NewsCreator
            name={owner.username}
            avatarColor={owner.avatarColor}
            avatarImg={owner.avatarImg}
          />
          {news.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
        <div className={styles.friendAndWeather}>
          <RandomFriend />
          <Weather />
        </div>

        <FriendsOnline />
      </div>
    </Layout>
  )
}

export default NewsPage
