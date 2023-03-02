import { Request, Response } from 'express'
import fs from 'fs'

export const findAllWallpaper = async (req: Request, res: Response) => {
  try {
    fs.readFile('./db.json', (err: any, data: any) => {
      if (err) throw err
      const wallpaper = JSON.parse(data)

      res.status(201).json({
        status: 'success',
        data: wallpaper.data,
      })
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
