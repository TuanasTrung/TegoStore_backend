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
        validator: (name) => { name.length > 5 && value.length <= 20 },
        message: 'User must be at least 5 characters, max: 20',
      }
    },
    price: {
      type: Number,
      required: true,
      // validate: {
      //   message: 'Must be number'
      // }
    },
    slug: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
  })
)

export default Product