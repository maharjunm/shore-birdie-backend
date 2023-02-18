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
    price: {
      type: Number,
      required: true,
    },
    hosting_time:{
      type: Number,
      required: true,
    },
    features:[{
      name:String,
      value:Boolean,
    }],
    address: {
      address_city: {
        type: String,
        required: true,
        trim: true,
      },
      address_country: {
        type: String,
        required: true,
        trim: true,
      },
      address_line1: {
        type: String,
        required: true,
        trim: true,
      }
    },
    card_number: {
      type: Number,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true
    },
    cvc: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }  
    
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * Check if email is taken product
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded if he again taking product in future 
 * @returns {Promise<boolean>}
 */
paymentSchema.statics.isProductTaken = async function (email, excludePaymentId) {
  const payment = await this.findOne({ email, _id: { $ne: excludePaymentId } });
  return !!payment;
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
