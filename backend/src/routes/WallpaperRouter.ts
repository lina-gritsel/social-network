import express from 'express'
import { findAllWallpaper } from '../api/wallpaper/wallpaper.controller'

const wallpaperRouter = express.Router()

wallpaperRouter.route('/').get(findAllWallpaper)

export default wallpaperRouter
