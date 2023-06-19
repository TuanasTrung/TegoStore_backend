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
        productName: { type: String },
        productPrice: { type: Number },
        productImage: { type: String },
        cartQuantity: { type: Number, default: 1 },
      }
    ],
    shippingFee: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    // shipping: {
    //   type: Object,
    //   required: true
    // },
    delivery_status: {
      type: String,
      default: 'Đang xử lý'
    },
    payment_status: {
      type: String,
      required: true
    }
  }, { timestamps: true })
)

export default Order