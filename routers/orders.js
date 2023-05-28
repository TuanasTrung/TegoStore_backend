import express from "express";
import {
  orderController
} from '../controllers/index.js'
import middleware from "../controllers/middleware.js";

const router = express.Router();

// get all orders
router.get('/', orderController.getAllOrders)

// get orders by id
router.get('/:userId', orderController.getOrderById)

// them don hang
router.post('/', middleware.verifyToken ,orderController.insertOrder)

// update don hang
router.put('/:id', orderController.updateOrder)

// xoa don hang
router.delete('/:id', orderController.deleteOrder)

export default router