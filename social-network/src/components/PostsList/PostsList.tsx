import { FC, useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

import { getAllPosts } from '../../api/requests'
import { sortNews } from '../../utils'

import PostCard, { News } from '../PostCard/PostCard'

import styles from './PostsList.module.scss'

interface PostsListProps {
  isAllPosts: boolean
  filterPostsForProfilePage?: boolean
  filterId?: string
  isProfilePage?: boolean
  setIsAllPosts?: (boolean) => void
}

const PostsList: FC<PostsListProps> = ({
  isAllPosts,
  filterPostsForProfilePage,
  isProfilePage,
  setIsAllPosts,
  filterId,
}) => {
  const [allPosts, setAllPosts] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getAllExistPosts = async () => {
      setIsLoading(true)
      const posts: News[] = (await getAllPosts()).posts
      const sortedPosts = posts.sort((a, b) =>
        sortNews(a.createdAt, b.createdAt),
      )

      if (filterPostsForProfilePage) {
        setAllPosts(sortedPosts.filter((post) => post.userId === filterId))
      } else {
        setAllPosts(sortedPosts)
      }
      setIsLoading(false)
    }
    getAllExistPosts()
  }, [isAllPosts, filterPostsForProfilePage, filterId])

  if (isLoading)
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )

  return (
    <>
      {allPosts.map((post, index) => (
        <PostCard
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
