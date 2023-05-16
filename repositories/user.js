import Exception from '../exceptions/Exception.js'
import { print, OutputType } from '../helpers/print.js'
import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({ email, password }) => {
  // print(`login user in user repository with emai: ${email} and password: ${password}`, OutputType.INFORMATION)
  let existingUser = await User.findOne({ email }).exec()
  if (existingUser) {
    // not encrypt password !!
    let isMatch = await bcrypt.compare(password, existingUser.password) // tham so thu tu, mat khat chua ma hoa -> mat khau da ma hoa 
    if (!!isMatch) {
      //create Java Web Token
      let token = jwt.sign({
        data: existingUser,

      },
        process.env.APP_JWT_SECRET,
        {
          // expiresIn:'60' // a minute
          expiresIn: '30 days'
        }
      )
      //clone an add more proprty
      return {
        ...existingUser.toObject(),
        password: 'Not show',
        token: token
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
  }
}

const register = async ({
  name,
  email,
  password,
  phoneNumber,
  address,
}) => {
  const existingUser = await User.findOne({ email: email }).exec()
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST)
  }
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
  //insert to db
  const newUser = await User.create({
    name, email,
    password: hashedPassword,
    phoneNumber,
    address,
  })
  return {
    ...newUser._doc,
    password: 'Not show'
  }
  // print('register user with name: ' + name
  //   + ' email: ' + email
  //   + ' password: ' + password
  //   + ' phoneNumber: ' + phoneNumber
  //   + ' address: ' + address, OutputType.INFORMATION)
}

export default {
  login,
  register,
}