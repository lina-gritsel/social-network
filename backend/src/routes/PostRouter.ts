import express from 'express'

import { validate } from './../middleware/validate'
import {
  createPost,
  findAllPosts,
  findPost,
} from '../api/posts/post.controller'
import { createPostSchema } from '../api/posts/post.schema'

const postRouter = express.Router()

postRouter
  .route('/')
  .post(validate(createPostSchema), createPost)
  .get(findAllPosts)

postRouter.route('/:postId').get(findPost)

export default postRouter
