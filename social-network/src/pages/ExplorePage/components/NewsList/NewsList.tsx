import { FC } from 'react'

import { NewsInfo } from '../../../../requests/news'
import { dateConversion } from '../../../../utils'

import NewsCard from '../NewsCard'

import styles from './NewsList.module.scss'

interface NewsListProps {
  articles: NewsInfo[]
}

const MAX_CHARACTERS = 150

const slicedContent = (content: string): string =>
  content?.slice(0, MAX_CHARACTERS)

const NewsList: FC<NewsListProps> = ({ articles }) => {
  return (
    <div className={styles.list}>
      {articles.map((articel: NewsInfo, index: number) => {
        const { source, description, url, content, publishedAt, urlToImage } =
          articel

        const existFullContent = !!description || !!content || !!urlToImage

        return (
          existFullContent && (
            <NewsCard
              key={index}
              username={source.name}
              createdAt={dateConversion(publishedAt)}
              image={urlToImage}
              content={(slicedContent(content) || description) + '...'}
              className={styles.card}
              url={url}
            />
          )
        )
      })}
    </div>
  )
}

export default NewsList
