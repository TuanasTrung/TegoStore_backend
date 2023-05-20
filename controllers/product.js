import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { productRepository } from '../repositories/index.js'
import { Product } from '../models/index.js'


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
  // res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json({
  //   message: 'Cannot get products'
  // })
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(HttpStatusCode.OK).json(product);
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

const updateProduct = async (req, res) => {

}

const insertProduct = async (req, res) => {
  try {
    const newProduct = await new Product({
      image: req.body.image,
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      quantity: req.body.quantity,
    });
    const product = await newProduct.save();

    return res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Insert product succesfully',
      data: product
    })
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'Cannot insert product: ' + exception
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(HttpStatusCode.OK).json('Delete successfully')
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  insertProduct,
  deleteProduct
}