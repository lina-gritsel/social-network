import { FC, useEffect, useState } from 'react'

import { useAppDispatch } from '../../store'
import Layout from '../../components/Layout'
import Weather from '../../components/Weather'
import { fetchUser } from '../../store/actions'
import NewsCard from '../../components/NewsCard'
import { getAllPosts } from '../../api/requests'
import NewsCreator from '../../components/NewsCreator'
import RandomFriend from '../../components/RandomFriend'
import FriendsOnline from '../../components/FriendsOnline'

import { getRandomColor, userNews } from './NewsPageComponents/userNews'

import styles from './NewsPage.module.scss'

const setAvatarColor = (arr) => {
return arr.map(post=> Object.assign(post, {avatarColor: getRandomColor}))
}

const NewsPage: FC = () => {
  const dispatch = useAppDispatch()

  const owner = userNews[4]
  const [allPosts, setAllPosts] = useState([])
  const [isAllPosts, setIsAllPosts] = useState<boolean>(false)
  const userId = JSON.parse(localStorage.getItem('userId')) as string

  useEffect(() => {
    const getAllExistPosts = async () => {
      const allExistPosts = await getAllPosts()
      setAllPosts(setAvatarColor(allExistPosts.posts))
    }

    getAllExistPosts()
  }, [isAllPosts])

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])

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
            {allPosts?.map(({ username, content, createdAt }, index) => (
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
