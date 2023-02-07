import express from 'express'

import { validate } from './../middleware/validate'
import {
  createPost,
  deletePost,
  findAllPosts,
  findPost,
  updatePost,
} from '../api/posts/post.controller'
import { createPostSchema, updatePostSchema } from '../api/posts/post.schema'

const postRouter = express.Router()

postRouter
  .route('/')
  .get(findAllPosts)
  .post(validate(createPostSchema), createPost)

postRouter
  .route('/:postId')
  .get(findPost)
  .patch(validate(updatePostSchema), updatePost)
  .delete(deletePost)

export default postRouter
