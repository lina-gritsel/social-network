import { NewsInfo } from './types'
import axios from 'axios'

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?country=us'
const NEWS_API_TOKEN = 'd5bc1a1db88b4f3aadb1383f0d20a11f'

type FetchNewsByCategory = (
  category: string,
) => Promise<{ articles: NewsInfo[] }>

export const fetchNewsByCategory: FetchNewsByCategory = async (category) => {
  const { data } = await axios.get<{ articles: NewsInfo[] }>(
    `${NEWS_API_URL}&category=${category}&apiKey=${NEWS_API_TOKEN}`,
  )

  return data
}
