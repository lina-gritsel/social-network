import { useEffect, useState } from 'react'

import { fetchNewsByCategory, NewsInfo } from '../../../requests/news'

type UseFetchNews = (category: string) => {
  isLoading: boolean
  articles: NewsInfo[]
}

export const useFetchNews: UseFetchNews = (category) => {
  const [articles, setArticles] = useState<NewsInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)

      const { articles } = await fetchNewsByCategory(category)
      setArticles(articles)

      setIsLoading(false)
    }
    fetchNews()
  }, [category])

  return {
    isLoading,
    articles,
  }
}
