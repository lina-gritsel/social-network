import express from 'express'

import { loginUser } from '../api/login/login.controller'
import { loginSchema } from '../api/login/login.schema'
import { validate } from '../middleware/validate'

const loginRouter = express.Router()

loginRouter
  .route('/')
  .post(validate(loginSchema), loginUser)

  export default loginRouter
