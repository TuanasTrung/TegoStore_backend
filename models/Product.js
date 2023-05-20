import mongoose, { Schema, ObjectId } from "mongoose";

const Product = mongoose.model('Product',
  new Schema({
    id: { type: ObjectId },
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (name) => { name.length > 5 && name.length <= 20 },
        message: 'User must be at least 5 characters, max: 20',
      },
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      // validate: {
      //   message: 'Must be number'
      // }
    },
    rating: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    }
  })
)

export default Product