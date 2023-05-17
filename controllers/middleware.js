import jwt from 'jsonwebtoken';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';

//verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.APP_JWT_SECRET,(err, user)=> {
      if(err){
        res.status(HttpStatusCode.TOKEN_NOT_VALID).json('Token is not valid');
      }
      req.user = user;
      next();
    })
  } else {
    res.status(HttpStatusCode.NOT_AUTHENTICATED).json(`You're not authenticated`);
  }
}

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id == req.params.id || req.user.admin){
      next();
    } else {
      res.status(HttpStatusCode.TOKEN_NOT_VALID).json(`You're not allowed to delete other`)
    }
  })
}

export default {
  verifyToken,
  verifyTokenAndAdminAuth
}