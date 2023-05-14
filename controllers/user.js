import { body, validationResult } from 'express-validator'
import { userRepository, productRepository } from '../repositories/index.js'
import { EventEmitter } from 'node:events'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import Exception from '../exceptions/Exception.js'

const myEvent = new EventEmitter()
//listen 
myEvent.on('event.register.user', (params) => {
  console.log(`They talk about: ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
  const errors = validationResult(req)
  //email, password
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: errors.array()
    });
  }
  const { email, password } = req.body
  //call repository
  try{
    let existingUser = await userRepository.login(req.body)
    res.status(HttpStatusCode.OK).json({
      message: 'Login user successfully',
      data: existingUser
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json({
      message: exception.toString(),
    })
  }
}

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    address,
  } = req.body
  //Event emiiter

  myEvent.emit('event.register.user', req.body)
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address
    })
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

}

export default {
  login,
  register,
  getDetailUser
}