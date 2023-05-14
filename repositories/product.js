import Exception from "../exceptions/Exception.js"
import { Product } from "../models/index.js"

const getAllProducts = async ({
  page,
  size,
  searchString,
}) => {
  console.log('get all products with paging')
}

const insertProduct = async ({
  image,
  name,
  description,
  price,
  slug,
  rating,
}) => {
  // console.log('insert product')
  try {
    const product = await Product.create({
      image,
      name,
      description,
      price,
      slug,
      rating,
    })
    return product;
  } catch (exception) {
    if (!!exception.errors) {
      // error from validations
      throw new Exception('Input error', exception.errors)
    }
  }
}

export default {
  getAllProducts,
  insertProduct
}