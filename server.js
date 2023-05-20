import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

//authentication middleware
import checkToken from './authentication/auth.js'
import { usersRouter, productsRouter, authRouter, orderRouter } from './routers/index.js';
import db from './database/index.js'

const app = express()
// app.use(checkToken) //shield, guard

app.use(cors())
app.use(cookieParser())
app.use(express.json());

//ROUTES

app.use('/auth', authRouter)

app.use('/users', usersRouter)

app.use('/products', productsRouter)

app.use('/orders', orderRouter)

const port = process.env.APP_PORT || 1607;

app.listen(port, async () => {
  await db.connect()
  console.log(`Server running on port ${port} `)
});