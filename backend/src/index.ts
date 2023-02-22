require('dotenv').config()

import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { connectDB, sequelize } from './db'
import userRouter from './routes/UserRouter'
import postRouter from './routes/PostRouter'
import loginRouter from './routes/LoginRouter'
import wallpaperRouter from './routes/WallpaperRouter'

const app = express()

app.use(express.json({ limit: '10kb' }))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
)

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/login', loginRouter)
app.use('/api/wallpaper', wallpaperRouter)

app.get('/api/healthchecker', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Build CRUD API with Node.js and Sequelize',
  })
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `Route: ${req.originalUrl} does not exist on this server`,
  })
})

const PORT = 8000
app.listen(PORT, async () => {
  console.log('🚀Server started Successfully')
  await connectDB()
  sequelize.sync({ force: false }).then(() => {
    console.log('✅Synced database successfully...')
  })
})
