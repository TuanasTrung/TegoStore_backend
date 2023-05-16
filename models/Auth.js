import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

const User = mongoose.model('User',
  new Schema({
    id: { type: ObjectId },
    username: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (value) => { value.length > 3 },
        message: 'User must be at least 3 characters'
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail,
        message: 'Email is incorrect format'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    }
  }, { timestamps: true } //user dc tao va update luc nao
  )
)

export default User