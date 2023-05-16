import express from "express";
import { body, validationResult } from 'express-validator'
import { userController } from "../controllers/index.js";

const router = express.Router();

//get all user
router.get('/', userController.getAllUsers)

//delete user || id mean params
router.delete('/:id', userController.deleteUser)

export default router