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
  },
  userId:{
    type:String,
    required: true,
    unique: true,
  },
  role :{
    type:String,
    enum:['read-only','read-write','admin'],
    default:"read-only",
  },
} ,{timestamps : true});

UserSchema.statics.isAdmin = async function (email) {
  const admin = await this.findOne({'email':email,'role':'admin'});
  return !!admin;
};
module.exports = mongoose.model("user", UserSchema);