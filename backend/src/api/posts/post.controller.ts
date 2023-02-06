import { Request, Response } from "express"
import PostModel from "./model"
import { CreatePost } from "./post.schema"

export const createPost = async (
  req: Request<{}, CreatePost>,
  res: Response,
) => {
  console.log(req)
  try {
    const { content } = req.body

    const post = await PostModel.create({
      content,
    })

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}
