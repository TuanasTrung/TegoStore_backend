import mongoose, { Schema, ObjectId } from "mongoose";

const Order = mongoose.model('Order',
new Schema({
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: { type: String },
      quantity: { type: Number, default: 1 }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shipping: {
    type: Object,
    required: false
  },
  delivery_status: {
    type: String,
    default: 'pending'
  },
  payment_status: {
    type: String,
    required: true
  }
}, { timestamps: true })
)

export default Order