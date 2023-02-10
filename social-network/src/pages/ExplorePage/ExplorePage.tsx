import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'

import NewsCard from '../../components/NewsCard'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { DEFAULT_IMG } from '../../components/NewsCard/NewsCard'

import { getAPI, newsOptions } from './constants'

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

interface NewsList {
  articles: Article[]
}

const ExplorePage: FC = () => {
  const [articles, setArticles] = useState<Article[] | []>([])
  const [category, setCategory] = useState<string>('general')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true)
      const res = await Axios.get(getAPI(category))
      setArticles(res.data.articles)
      setIsLoading(false)
    }
    getArticles()
  }, [category])

  const { t } = useTranslation()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.options}>
          {newsOptions.map((option, index) => (
            <Button
              key={index}
              className={category === option ? 'activeBtn' : ''}
              onClick={() => setCategory(option)}
            >
              {t(option).toUpperCase()}
            </Button>
          ))}
        </div>
        {isLoading ? (
          <div className={styles.loading}>{t('loading')}</div>
        ) : (
          <NewsList articles={articles} />
        )}
      </div>
    </Layout>
  )
}

const NewsList: FC<NewsList> = ({ articles }) => {
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
            url,
          },
          index: number,
        ) =>
          !!description || !!content || !!urlToImage ? (
            <NewsCard
              key={index}
              name={author?.split(',')[0] || source.name}
              createdAt={publishedAt.split('T').join(' / ').slice(0, -4)}
              img={urlToImage || DEFAULT_IMG}
              content={(content?.slice(0, 150) || description) + '...'}
              className={styles.card}
              url={url}
            />
          ) : null,
      )}
    </div>
  )
}

export default ExplorePage
