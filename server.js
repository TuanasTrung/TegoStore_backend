import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
//authentication middleware
import checkToken from './authentication/auth.js'
import {usersRouter, productsRouter} from './routers/index.js';
import db from './database/index.js'

const app = express()
app.use(checkToken) //shield, guard

// app.use(express.json())
// app.use(cors({
//   origin: ["http://localhost:8080", "http://localhost:3060"],
//   method: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }))

// app.use(express.urlencoded({
//   extended: true
// }));

app.use(express.json());

// static url
// app.use(express.static(path.join(__dirname, '/../public')));

// const route = require('./routes/index');
// route(app);

app.use('/users', usersRouter)

app.use('/products', productsRouter)

const port = process.env.APP_PORT || 1607;

app.listen(port, async () => {
  await db.connect()
  console.log(`Server running on port ${port} `)
});