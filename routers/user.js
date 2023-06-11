import express from "express";
import { userController } from "../controllers/index.js";
import middleware from "../controllers/middleware.js";

const router = express.Router();

//get all user
router.get('/', middleware.verifyToken, userController.getAllUsers)

//get user by id
router.get('/:id', middleware.verifyTokenAndAdminAuth, userController.getUserById)

//delete user || id mean params
router.delete('/:id', userController.deleteUser)

//update user
router.put('/:id', userController.updateUser)

export default router