const { object } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  username :{
    type : String,
    required :true 
  },
  password :{
    type : String,
    required : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  role :{
    type : String,
    required : true
  },
} ,{timestamps : true});

module.exports = mongoose.model("user", UserSchema);