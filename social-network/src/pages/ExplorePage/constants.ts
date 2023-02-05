export const getAPI = (category: string) => {
  return `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d5bc1a1db88b4f3aadb1383f0d20a11f`
}

export const newsOptions: string[] = [
  'general',
  'sport',
  'health',
  'business',
  'science',
  'technology',
]
