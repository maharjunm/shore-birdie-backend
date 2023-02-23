const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const uuid = require("uuid").v4
const bodyparser = require('body-parser')
const config = require('../config/config')
const stripe = require("stripe")(config.stripekey)

const createPayment = async (paymentBody) => {
  const { token, product } = paymentBody;
  if (await Payment.isProductTaken(token.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email  has already purchased the product');
  }
  const customer = await stripe.customers.create({
        email: token.email,
        source:token.id
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount:product.price * 100,
    currency:'eur',
    payment_method_type:['card'],

  });
  return {
    "title":"stripe payment info",
    "status":"success",
    "information":{
      "token":token,
      "product":product
    }
  };

};

module.exports = {createPayment};