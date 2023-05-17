import express from "express";
import { body, validationResult } from 'express-validator'
import { authController } from '../controllers/index.js'
import middlewareController from '../controllers/middleware.js'

const router = express.Router();

// router.get('/:id', userController.getDetailUser)

router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/refresh', authController.requestRefreshToken)

router.post('/logout', middlewareController.verifyToken, authController.logout)

export default router