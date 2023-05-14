import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { productRepository } from '../repositories/index.js'


const getAllProducts = async (req, res) => {
  res.status(HttpStatusCode.OK).json({
    message: 'Get products successfully',
    data: [
      {
        id: 1,
        image: '/assets/images/product/0.png',
        name: 'DINOSAUR',
        price: '300.000',
        slug: '1',
        rating: 5,
      },
      {
        id: 2,
        image: '/assets/images/product/1.png',
        name: 'DINOSAUR',
        price: '300.000',
        slug: '2',
        rating: 5,
      },
      {
        id: 3,
        image: '/assets/images/product/2.png',
        name: 'DINOSAUR',
        price: '300.000',
        slug: '3',
        rating: 4,
      },
      {
        id: 4,
        image: '/assets/images/product/3.png',
        name: 'DINOSAUR',
        price: '300.000',
        slug: '4',
        rating: 4,
      },
      {
        id: 5,
        image: '/assets/images/product/4.png',
        name: 'DINOSAUR',
        price: '300.000',
        slug: '5',
        rating: 4,
      },
    ]
  })
  // res.status(HttpStatusCode.INTERAL_SERVER_ERROR).json({
  //   message: 'Cannot get products'
  // })
}

const getProductById = async (req, res) => {

}

const updateProduct = async (req, res) => {

}

const insertProduct = async (req, res) => {
  try {
    const product = await productRepository.insertProduct(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Insert product succesfully',
      data: product
    })
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'Cannot insert product: ' + exception,
      validationErrors: exception.validationErrors
    })
  }
}

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  insertProduct
}