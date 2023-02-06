import express from 'express'

import { validate } from './../middleware/validate'
import { createPost, findAllPosts } from '../api/posts/post.controller'
import { createPostSchema } from '../api/posts/post.schema'

const postRouter = express.Router()

postRouter
  .route('/')
  .post(validate(createPostSchema), createPost)
  .get(findAllPosts)

export default postRouter
