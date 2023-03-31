const { object } = require('joi');
const mongoose = require('mongoose');

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
  userId:{
    type:String,
    required: true,
  },
  role :{
    type:String,
    enum:['USER','ADMIN','SUPER_ADMIN'],
    default:"USER",
  },
} ,{timestamps : true});

module.exports = mongoose.model("user", UserSchema);