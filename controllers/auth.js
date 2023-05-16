import { body, validationResult } from 'express-validator'
import { User } from '../models/index.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import * as bcrypt from 'bcrypt'
import { EventEmitter } from 'node:events'
import Exception from '../exceptions/Exception.js'

// const myEvent = new EventEmitter()
//listen 
// myEvent.on('event.register.user', (params) => {
//   console.log(`They talk about: ${JSON.stringify(params)}`)
// })

const login = async (req, res) => {
  const errors = validationResult(req)
  //email, password
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: errors.array()
    });
  }
  //call repository
  try {
    const user = await User.findOne({username: req.body.username})
    if(!user){
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Wrong username!'
      })
    }
    const validPassword = await bcrypt.compare(
      req.body.password, user.password
      );
    if(!validPassword){
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Wrong password'
      })
    }
    if(user && validPassword) {
      res.status(HttpStatusCode.OK).json(user)
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json(exception)
  }
}

const register = async (req, res) => {
  //Event emiiter

  // myEvent.emit('event.register.user', req.body)
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    })

    const user = await newUser.save();

    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json({
      message: exception.toString(),
    })
  }
}

const getDetailUser = async (req, res) => {
  res.status(HttpStatusCode.INSERT_OK).json({
    message: 'successfully',
  })
}

export default {
  login,
  register,
  getDetailUser
}