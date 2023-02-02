import { FC } from 'react'
import Menu from '../../components/Menu'
import NewsCreator from './NewsPageComponents/CreateNews'
import NewsCard from './NewsPageComponents/NewsCard'
import { userNews } from './NewsPageComponents/userNews'
import styles from './NewsPage.module.scss'

const NewsPage: FC = () => {
  const owner = userNews[4]
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.news}>
        <NewsCreator name={owner.name} avatarColor={owner.avatarColor} avatarImg={owner.avatarImg}/>
        {userNews.map((news, i) => (
          <NewsCard key={i} props={news} />
        ))}
      </div>
    </div>
  )
}

export default NewsPage
