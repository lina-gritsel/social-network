import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import UserModel from '../users/model'

export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body

  try {
    const user = await UserModel.findOne({ where: { name } })

    if (user) {
      const validity = await bcrypt.compare(password, user.dataValues.password)

      validity
        ? res.status(200).json(user)
        : res.status(400).json('Change your name or enter the correct password')
    } else {
      res.status(404).json('User does not exists')
    }
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
