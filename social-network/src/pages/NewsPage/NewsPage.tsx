import { FC } from 'react'
import NewsCreator from '../../components/NewsCreator/NewsCreator'
import NewsCard from '../../components/NewsCard/NewsCard'
import { userNews } from './NewsPageComponents/userNews'
import styles from './NewsPage.module.scss'

const NewsPage: FC = () => {
  const owner = userNews[4]
  return (
    <div className={styles.container}>
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
