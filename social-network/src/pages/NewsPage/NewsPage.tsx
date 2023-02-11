import { FC, useState, useEffect } from 'react'

import FriendsOnline from '../../components/FriendsOnline'

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
import RandomFriend from '../../components/RandomFriend'
import { useTranslation } from 'react-i18next'

const setAvatarColor = (arr: News[]) => {
  return arr.map((news) =>
    Object.assign(news, { avatarColor: getRandomColor() }),
  )
}

const NewsPage: FC = () => {
  const [allPosts, setAllPosts] = useState<News[]>([])
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()

  useEffect(() => {
    const getAllExistPosts = async () => {
      setIsLoading(true)
      const posts: News[] = (await getAllPosts()).posts
      posts
        .sort((a, b) => sortNews(a.createdAt, b.createdAt))
        .map((post) => {
          post.createdAt = dateConversion(post.createdAt)
          const content = post.content
          if(content.length > 100) {
            post.content = content.slice(0, 100) + "..." 
            post.moreContent = content.slice(101)
          } 
        })
      setAllPosts(setAvatarColor(posts))
      setIsLoading(false)
    }
    getAllExistPosts()
  }, [isAllPosts])

  const owner = userNews[4]

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.news}>
          <NewsCreator
            setIsAllPosts={setIsAllPosts}
            name={owner.username}
            avatarColor={owner.avatarColor}
            avatarImg={owner.avatarImg}
          />
          {isLoading ? (
            <div className={styles.loading}>{t('loading')}</div>
          ) : (
            allPosts.map((post, index) => <NewsCard key={index} {...post} />)
          )}
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
