import { body, cookie, validationResult } from 'express-validator'
import { User } from '../models/index.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign({
    id: user._id,
    admin: user.admin
  },
    process.env.APP_JWT_SECRET,
    { expiresIn: '30s' })
}

const generateRefreshToken = (user) => {
  return jwt.sign({
    id: user._id,
    admin: user.admin
  },
    process.env.APP_JWT_REFRESH,
    { expiresIn: '365 days' })
}

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
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Wrong username!'
      })
    }
    const validPassword = await bcrypt.compare(
      req.body.password, user.password
    );
    if (!validPassword) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Wrong password'
      })
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', `${refreshToken}`, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        overwrite: true,
      })
      const { password, ...others } = user._doc;
      return res.status(HttpStatusCode.OK).json({ ...others, accessToken, refreshToken })
    }
  } catch (exception) {
    return res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json(exception)
  }
}

const register = async (req, res) => {
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

    return res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  } catch (exception) {
    return res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json({
      message: exception.toString(),
    })
  }
}

const requestRefreshToken = async (req, res) => {
  // take refreshtoken from user
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(HttpStatusCode.NOT_AUTHENTICATED).json(`You're not authentucated`);
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json('Refresh Token is not valid')
    }
  }
  jwt.verify(refreshToken, process.env.APP_JWT_REFRESH, (err, user) => {
    if (err) {
      console.log(err)
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    // res.cookie('refreshToken', newRefreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   path: '/',
    //   sameSite: 'strict'
    // })
    res.status(HttpStatusCode.OK).json({ accessToken: newAccessToken });
  })
}

const logout = (req, res) => {
  res.clearCookie('refreshToken');
  refreshTokens = refreshTokens.filter(token => token != req.cookies.refreshToken)
  res.status(HttpStatusCode.OK).json('Logged out!')
}

const getDetailUser = async (req, res) => {
  res.status(HttpStatusCode.INSERT_OK).json({
    message: 'successfully',
  })
}

export default {
  login,
  register,
  requestRefreshToken,
  logout,
  getDetailUser
}