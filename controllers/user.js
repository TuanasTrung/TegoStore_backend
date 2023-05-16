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

const deleteUser = async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(HttpStatusCode.OK).json('Delete successfully')
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

export default {
  getAllUsers,
  deleteUser
}