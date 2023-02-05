import express from 'express'

import { createUserSchema, updateUserSchema } from '../api/users/user.schema'
import { validate } from '../middleware/validate'
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
  .post(validate(createUserSchema), createUserController)

userRouter
  .route('/:userId')
  .get(findUserController)
  .patch(validate(updateUserSchema), updateUserController)
  .delete(deleteUserController)

userRouter.route('/:userId/follow').patch(followUserController)

export default userRouter
