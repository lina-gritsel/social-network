import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import NewsCard, { News } from '../NewsCard/NewsCard'
import { getAllPosts } from '../../api/request'
import { sortNews, dateConversion } from '../../constants/constants'
import { setAvatarColor } from '../../pages/NewsPage/NewsPage'

import styles from './NewsList.module.scss'

interface NewsListProps {
  isAllPosts: boolean
  filter?: boolean
}

const NewsList: FC<NewsListProps> = ({ isAllPosts, filter }) => {
  const [allPosts, setAllPosts] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()

  useEffect(() => {
    const getAllExistPosts = async () => {
      setIsLoading(true)
      const posts: News[] = (await getAllPosts()).posts
      posts
        .sort((a, b) => sortNews(a.createdAt, b.createdAt))
        .map((post) => {
          post.createdAt = dateConversion(post.createdAt)
          const content = post.content
          if (content.length > 100) {
            post.content = content.slice(0, 100) + '...'
            post.moreContent = content.slice(101)
          }
        })
      const filterPost = filter
        ? posts.filter((post) => post.username === 'Alina')
        : posts
      setAllPosts(setAvatarColor(filterPost))
      setIsLoading(false)
    }
    getAllExistPosts()
  }, [isAllPosts])

  if (isLoading) return <div className={styles.loading}>{t('loading')}</div>

  return (
    <>
      {allPosts.map((post, index) => (
        <NewsCard key={index} {...post} />
      ))}
    </>
  )
}

export default NewsList
