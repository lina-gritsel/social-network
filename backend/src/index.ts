require('dotenv').config()

import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.json({ limit: '10kb' }))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
)

app.get('/api/healthchecker', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Build CRUD API with Node.js and Sequelize',
    })
})


app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 'fail',
        message: `Route: ${req.originalUrl} does not exist on this server`,
    })
})

const PORT = 8000
app.listen(PORT, async () => {
    console.log('🚀Server started Successfully')
})
