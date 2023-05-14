import express from "express";
import {
  productController
} from '../controllers/index.js'

const router = express.Router();

router.get('/', productController.getAllProducts)
//get product by id
router.get('/:id', productController.getProductById)

//put or patch 
router.patch('/', productController.updateProduct)

router.post('/', productController.insertProduct)

export default router