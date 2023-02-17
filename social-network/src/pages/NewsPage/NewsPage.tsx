import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Layout from '../../components/Layout'
import Weather from '../../components/Weather'
import NewsCreator from '../../components/NewsCreator'
import RandomFriend from '../../components/RandomFriend'
import FriendsOnline from '../../components/FriendsOnline'
import { getUserInfoSelector } from '../../store/selectors'
import { getRandomColor } from '../../utils/utils'
import { getAllUsers, User } from '../../api'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [allUsers, setAllUsers] = useState<User[]>([])

  const userInfo = useSelector(getUserInfoSelector)
  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      const res = await getAllUsers()
      setAllUsers(res.users.filter((user) => user.id !== userId))
      setIsLoading(false)
    }
    getUsers()
  }, [userId])

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
            <RandomFriend allUsers={allUsers} isLoading={isLoading}/>
            <Weather />
          </div>
        </div>
        <FriendsOnline allUsers={allUsers} isLoading={isLoading}/>
      </div>
    </Layout>
  )
}

export default NewsPage
