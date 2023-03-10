import { Request, Response } from 'express'
import UserModel from '../users/model'
import PostModel from './model'
import {
  AddComment,
  CreatePost,
  FilterQuery,
  Params,
  UpdatePost,
} from './post.schema'

export const createPost = async (
  req: Request<{}, CreatePost>,
  res: Response,
) => {
  try {
    const { userId, content, image } = req.body

    const post = await PostModel.create({
      userId,
      content,
      image,
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
    const limit = req.query.limit || 1000
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

export const deletePost = async (req: Request<Params>, res: Response) => {
  try {
    const result = await PostModel.destroy({
      where: { id: req.params.postId },
      force: true,
    })

    if (result === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note with that ID not found',
      })
    }

    res.status(204).json()
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const updatePost = async (
  req: Request<UpdatePost['params'], {}, UpdatePost['body']>,
  res: Response,
) => {
  try {
    const result = await PostModel.update(
      { ...req.body, updatedAt: Date.now() },
      {
        where: {
          id: req.params.postId,
        },
      },
    )

    if (result[0] === 0) {
      return res.status(404).json({
        status: 'fail',
        messsage: 'Note whit that ID not found',
      })
    }

    const post = await PostModel.findByPk(req.params.postId)

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

export const addComment = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findByPk(req.params.postId)
    const commentExist = post?.dataValues?.comments
    const comments = commentExist ? [...post?.dataValues?.comments] : []

    const user = await UserModel.findByPk(req.body.userId)

    comments.push({
      postId: req.body.postId,
      comment: req.body.comment,
      createAt: Date.now(),
      user: {
        id: req.body.userId,
        name: user?.dataValues.name,
        avatar: user?.dataValues.avatar,
      },
    })

    post
      ?.update({ comments }, { where: { id: req.params.postId } })
      .then((post: any) => res.json(post))
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const changeLikes = async (req: Request<any>, res: Response) => {
  try {
    const post = await PostModel.findByPk(req.params.postId)
    const likesExist = post?.dataValues?.likes

    const likes = likesExist ? [...post?.dataValues.likes] : []

    const userExist = !!likes.find(
      (item: any) => item?.userId === req.body.userId,
    )

    if (userExist) {
      const lists = likes.filter(({ userId }) => userId !== req.body.userId)

      post?.update(
        { likes: lists },
        {
          where: {
            id: req.params.postId,
          },
        },
      )

      res.status(200).json({
        status: 'success',
        data: { post },
      })
    } else {
      likes.push(req.body)

      post?.update(
        { likes },
        {
          where: {
            id: req.params.postId,
          },
        },
      )

      res.status(200).json({
        status: 'success',
        data: { post },
      })
    }
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
