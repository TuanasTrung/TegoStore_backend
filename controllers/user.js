import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { User } from "../models/index.js";

//get all users 
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(HttpStatusCode.OK).json(user)
  } catch (ex) {
    res.status(HttpStatusCode.BAD_REQUEST).json(ex)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(HttpStatusCode.OK).json('Delete successfully')
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    )
    res.status(HttpStatusCode.OK).send(updatedUser);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).send(error)
  }
}

const getUserById = async (req, res) => {
try {
  const user = await User.findById(req.params.id);
  res.status(HttpStatusCode.OK).json(user)
} catch (error) {
  res.status(HttpStatusCode.BAD_REQUEST).json(error)
}
}

export default {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser
}