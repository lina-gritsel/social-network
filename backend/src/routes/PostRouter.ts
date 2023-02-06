import express from "express"

import { validate } from "./../middleware/validate"
import { createPost } from "../api/posts/post.controller"
import { createPostSchema } from "../api/posts/post.schema"

const postRouter = express.Router()

postRouter
.route("/")
.post(validate(createPostSchema), createPost)

export default postRouter
