import express from "express";
import { body, validationResult } from 'express-validator'
import { authController } from '../controllers/index.js'

const router = express.Router();

// router.get('/:id', userController.getDetailUser)

router.post('/login', authController.login)

router.post('/register', authController.register)

export default router