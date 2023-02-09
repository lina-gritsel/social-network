import { FC } from 'react'

import Layout from '../../components/Layout'
import NewsCard from '../../components/NewsCard'
import NewsCreator from '../../components/NewsCreator'
import FriendsOnline from '../../components/FriendsOnline'

import { userNews } from './NewsPageComponents/userNews'

import styles from './NewsPage.module.scss'
import RandomFriend from '../../components/RandomFriend'

const NewsPage: FC = () => {
  const owner = userNews[4]

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.news}>
          <NewsCreator
            name={owner.name}
            avatarColor={owner.avatarColor}
            avatarImg={owner.avatarImg}
          />
          {userNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
        <RandomFriend/>
        <FriendsOnline />
      </div>
    </Layout>
  )
}

export default NewsPage
