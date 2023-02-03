import { FC, useEffect, useState } from 'react'
import Axios from 'axios'

import NewsCard from '../../components/NewsCard'
import { getRandomColor } from '../NewsPage/NewsPageComponents/userNews'

import styles from './ExplorePage.module.scss'

interface Source {
  id: string | null
  name: string
}

interface Article {
  source: Source
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

const API =
  'https://newsapi.org/v2/top-headlines?category=sport&apiKey=d5bc1a1db88b4f3aadb1383f0d20a11f'

const ExplorePage: FC = () => {
  const [articles, setArticles] = useState<Article[] | []>([])

  useEffect(() => {
    (async () => {
      const res = await Axios.get(API)
      setArticles(res.data.articles)

      console.log(articles)
    })()
  }, [])

  return (
    <div className={styles.news}>
      {articles.map(
        (
          {
            author,
            source,
            description,
            content,
            urlToImage,
            publishedAt,
          },
          index: number,
        ) =>
          !!description || !!content || !!urlToImage ? (
            <NewsCard
              key={index}
              name={author || source.name}
              date={publishedAt}
              img={urlToImage}
              content={description}
              moreContent={content}
              avatarColor={getRandomColor()}
            />
          ) : null,
      )}
    </div>
  )
}

// const NewsList: FC<Article[]> = ({articles})=> {
//     return (
//         <div className={styles.news}>
//         {articles.map(
//           (
//             {
//               author,
//               source,
//               description,
//               content,
//               urlToImage,
//               publishedAt,
//             },
//             index: number,
//           ) =>
//             !!description || !!content || !!urlToImage ? (
//               <NewsCard
//                 key={index}
//                 name={author || source.name}
//                 date={publishedAt}
//                 img={urlToImage}
//                 content={description}
//                 moreContent={content}
//                 avatarColor={getRandomColor()}
//               />
//             ) : null,
//         )}
//       </div>
  
//     )
// }

export default ExplorePage
