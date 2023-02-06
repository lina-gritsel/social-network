import { Request, Response } from 'express'
import PostModel from './model'
import { CreatePost, FilterQuery, Params } from './post.schema'

export const createPost = async (
  req: Request<{}, CreatePost>,
  res: Response,
) => {
  try {
    const { content } = req.body

    const post = await PostModel.create({
      content,
    })

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const findPost = async (req: Request<Params>, res: Response) => {
  try {
    const post = await PostModel.findByPk(req.params.postId)

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post with that ID not found',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { post },
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const findAllPosts = async (
  req: Request<{}, {}, {}, FilterQuery>,
  res: Response,
) => {
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit

    const posts = await PostModel.findAll({ limit, offset: skip })
    res.status(200).json({
      status: 'success',
      results: posts.length,
      posts,
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
