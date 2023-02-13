import { FC, useEffect, useState } from 'react'

import Layout from '../../components/Layout'
import Weather from '../../components/Weather'
import NewsCard from '../../components/NewsCard'
import { getAllPosts } from '../../api/requests'
import NewsCreator from '../../components/NewsCreator'
import RandomFriend from '../../components/RandomFriend'
import FriendsOnline from '../../components/FriendsOnline'

import { userNews } from './NewsPageComponents/userNews'

import styles from './NewsPage.module.scss'

const NewsPage: FC = () => {
  const owner = userNews[4]
  const [allPosts, setAllPosts] = useState([])
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)

  useEffect(() => {
    const getAllExistPosts = async () => {
      const allExistPosts = await getAllPosts()
      setAllPosts(allExistPosts.posts)
    }

    getAllExistPosts()
  }, [isAllPosts])

  return (
    <Layout>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.news}>
            <NewsCreator
              setIsAllPosts={setIsAllPosts}
              name={owner.name}
              avatarColor={owner.avatarColor}
              avatarImg={owner.avatarImg}
            />
            {allPosts.map(({ username, content, createdAt }, index) => (
              <NewsCard
                key={index}
                name={username}
                content={content}
                createdAt={createdAt}
              />
            ))}
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
