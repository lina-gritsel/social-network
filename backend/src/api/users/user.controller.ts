import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import UserModel from './model'
import {
  Friends,
  CreateUserInput,
  FilterQueryInput,
  ParamsInput,
  UpdateUserInput,
} from './user.schema'

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
) => {
  try {
    const { name, email, date, gender, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const existUser = await UserModel.findOne({ where: { name } })
    const existEmail = await UserModel.findOne({ where: { email } })

    if (existEmail) {
      res.status(401).json('this email is already registered')
      return
    }

    if (existUser) {
      const validity = await bcrypt.compare(
        password,
        existUser.dataValues.password,
      )

      validity
        ? res.status(200).json(existUser)
        : res.status(401).json('a user with the same name already exists')
    } else {
      const user = await UserModel.create({
        name,
        email,
        gender,
        date,
        password: hashedPass,
      })

      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      })
    }
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 'failed',
        message: 'Note with that title already exists',
      })
    }

    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const updateUserController = async (
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response,
) => {
  try {
    const result = await UserModel.update(
      { ...req.body, updatedAt: Date.now() },
      {
        where: {
          id: req.params.userId,
        },
      },
    )

    if (result[0] === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note with that ID not found',
      })
    }

    const user = await UserModel.findByPk(req.params.userId)

    res.status(200).json({
      status: 'success',
      data: { user },
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const findUserController = async (
  req: Request<ParamsInput>,
  res: Response,
) => {
  try {
    const user = await UserModel.findByPk(req.params.userId)

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User with that ID not found',
      })
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const findAllUserController = async (
  req: Request<{}, {}, {}, FilterQueryInput>,
  res: Response,
) => {
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit

    const users = await UserModel.findAll({ limit, offset: skip })
    res.status(200).json({
      status: 'success',
      results: users.length,
      users,
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

export const deleteUserController = async (
  req: Request<ParamsInput>,
  res: Response,
) => {
  try {
    const result = await UserModel.destroy({
      where: { id: req.params.userId },
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

export const followUserController = async (
  req: Request<Friends['params'], {}, Friends['body']>,
  res: Response,
) => {
  const user = req.params.userId
  const currentUserId = req.body.currentUserId

  if (user === currentUserId) {
    res.status(403).json('Action forbidden')
  } else {
    try {
      const subscribingUser = await UserModel.findByPk(user)
      const currentUser = await UserModel.findByPk(currentUserId)

      const followingExist = subscribingUser?.dataValues?.followings
      const followersExist = currentUser?.dataValues?.followers
      const followings = followingExist
        ? [...subscribingUser?.dataValues?.followings]
        : []

      const followers = followersExist
        ? [...currentUser?.dataValues?.followers]
        : []

      if (currentUser) {
        followings.push(currentUserId)
        followers.push(user)

        subscribingUser?.update(
          { updatedAt: Date.now(), followings },
          {
            where: {
              id: user,
            },
          },
        )
        currentUser?.update(
          { updatedAt: Date.now(), followers },
          {
            where: {
              id: currentUser,
            },
          },
        )

        res.status(200).json({
          status: 'success',
          data: {
            subscribingUser,
          },
        })
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User with this id does not exist',
        })
      }
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      })
    }
  }
}

export const unsubscribeFromUserController = async (
  req: Request<Friends['params'], {}, Friends['body']>,
  res: Response,
) => {
  try {
    const user = req.params.userId
    const currentUser = req.body.currentUserId

    const data = await UserModel.findByPk(user)
    const unsubscribe = await UserModel.findByPk(currentUser)

    const followings = data?.dataValues?.followings
    const followers = unsubscribe?.dataValues.followers

    const userExist = !!followings.find((item: string) => item === currentUser)

    if (userExist) {
      const followingList = followings.filter(
        (item: string) => item !== currentUser,
      )
      const followersList = followers.filter((item: string) => {
        item !== user
      })

      data?.update(
        { updatedAt: Date.now(), followings: followingList },
        { where: { id: user } },
      )
      unsubscribe?.update(
        { updatedAt: Date.now(), followers: followersList },
        { where: { id: currentUser } },
      )
      res.status(200).json({
        status: 'success',
        data: data?.dataValues,
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'User with this id does not exist',
      })
    }
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
