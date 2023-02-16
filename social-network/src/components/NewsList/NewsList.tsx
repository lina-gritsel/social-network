import { FC, useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

import NewsCard, { News } from '../NewsCard/NewsCard'
import { getAllPosts, getUser } from '../../api/requests'
import { sortNews, dateConversion } from '../../constants/constants'
import { setAvatarColor } from '../../pages/NewsPage/NewsPage'

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
  name,
  isProfilePage,
  setIsAllPosts,
}) => {
  const [allPosts, setAllPosts] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

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
      if (filter) {
        getUser(userId).then((response) => setUsername(response.data.user.name))
        setAllPosts(
          setAvatarColor(posts.filter((post) => post.username === username)),
        )
      } else {
        setAllPosts(setAvatarColor(posts))
      }
      setIsLoading(false)
    }
    getAllExistPosts()
  }, [isAllPosts, filter, userId, username])

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
