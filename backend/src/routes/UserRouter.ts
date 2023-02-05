import express from 'express'

import { createUserSchema, updateUserSchema } from '../api/users/user.schema'
import {
  createUserController,
  deleteUserController,
  findAllUserController,
  findUserController,
  followUserController,
  updateUserController,
} from '../api/users/user.controller'

const userRouter = express.Router()

userRouter
  .route('/')
  .get(findAllUserController)

userRouter
  .route('/:userId')
  .get(findUserController)
  .delete(deleteUserController)

userRouter.route('/:userId/follow').patch(followUserController)

export default userRouter
