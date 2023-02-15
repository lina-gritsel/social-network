import express from 'express'

import { validate } from './../middleware/validate'
import {
  addComment,
  changeLikes,
  createPost,
  deletePost,
  findAllPosts,
  findPost,
  updatePost,
} from '../api/posts/post.controller'
import {
  addCommentSchema,
  changeLikesSchema,
  createPostSchema,
  updatePostSchema,
} from '../api/posts/post.schema'

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

postRouter
  .route('/comments/:postId')
  .patch(validate(addCommentSchema), addComment)

postRouter
  .route('/likes/:postId')
  .patch(validate(changeLikesSchema), changeLikes)

export default postRouter
