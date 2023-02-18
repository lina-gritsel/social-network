import { FC, useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

import NewsCard, { News } from '../NewsCard/NewsCard'
import { getAllPosts } from '../../api/requests'
import { sortNews, dateConversion } from '../../utils/utils'

import styles from './NewsList.module.scss'

interface NewsListProps {
  isAllPosts: boolean
  filter?: boolean
  name?: string
  isProfilePage?: boolean
  setIsAllPosts?: (boolean) => void
}

const NewsList: FC<NewsListProps> = ({
  isAllPosts,
  filter,
  isProfilePage,
  setIsAllPosts,
}) => {
  const [allPosts, setAllPosts] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    const getAllExistPosts = async () => {
      setIsLoading(true)
      const posts: News[] = (await getAllPosts()).posts
      const sortedPosts = posts.sort((a, b) => sortNews(a.createdAt, b.createdAt))
      sortedPosts
        .map((post) => {
          const content = post.content
          // if (content.length > 100) {
          //   post.content = content.slice(0, 150) + '...'
          //   post.moreContent = content.slice(150)
          // }
        })
      if (filter) {
        setAllPosts(
          sortedPosts.filter((post) => post.username === userId),
        )
      } else {
        setAllPosts(sortedPosts)
      }
      setIsLoading(false)
    }
    getAllExistPosts()
  }, [isAllPosts, filter, userId])

  if (isLoading)
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )

  return (
    <>
      {allPosts.map((post, index) => (
        <NewsCard
          key={index}
          {...post}
          isProfilePage={isProfilePage}
          setIsAllPosts={setIsAllPosts}
        />
      ))}
    </>
  )
}

export default NewsList
