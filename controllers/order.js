import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { Order } from '../models/index.js'


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    return res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(HttpStatusCode.OK).send(updatedOrder);
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
  }
}

const insertOrder = async (req, res) => {
  const newOrder = await new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    return res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Insert product succesfully',
      data: savedOrder
    })
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'Cannot insert product: ' + exception
    })
  }
}

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(HttpStatusCode.OK).send("Order has been deleted...");
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
  }
}

export default {
  getAllOrders,
  getOrderById,
  updateOrder,
  insertOrder,
  deleteOrder
}