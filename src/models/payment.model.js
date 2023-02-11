const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const paymentSchema = mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job_type: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(valueN)) {
          throw new Error('Invalid email');
        }
      },
    },
    price: Number,
    hosting_time:Number,
    features:[{
      name:String,
      value:boolean,
    }],
    address: {
      address_city: String,
      address_country: String,
      address_line1
    },
    card_number: Number,
    expiry_date: Date,
    cvc: Number
  }  
    
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
