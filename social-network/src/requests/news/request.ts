import { NewsInfo } from './types'
import axios from 'axios'

const NEWS_API_URL = 'https://nodenews.up.railway.app/top-headlines?'
const NEWS_API_TOKEN = 'c4145b318a6d4ef58fb7e16254538a17'

type FetchNewsByCategory = (
  category: string,
) => Promise<{ articles: NewsInfo[] }>

export const fetchNewsByCategory: FetchNewsByCategory = async (category) => {
  const { data } = await axios.get<{ articles: NewsInfo[] }>(
    `${NEWS_API_URL}q=${category}&apiKey=${NEWS_API_TOKEN}`,
  )
  return data
}
