import { FC, useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

import NewsCard, { News } from '../PostCard/PostCard'
import { getAllPosts } from '../../api/requests'
import { sortNews } from '../../utils/utils'

import styles from './PostsList.module.scss'

interface PostsListProps {
  isAllPosts: boolean
  filter?: boolean
  name?: string
  isProfilePage?: boolean
  setIsAllPosts?: (boolean) => void
}

const PostsList: FC<PostsListProps> = ({
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
      const sortedPosts = posts.sort((a, b) =>
        sortNews(a.createdAt, b.createdAt),
      )

      if (filter) {
        setAllPosts(sortedPosts.filter((post) => post.userId))
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

export default PostsList
