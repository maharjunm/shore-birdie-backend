const httpStatus = require('http-status');
const { Payment,Product } = require('../models');
const ApiError = require('../utils/ApiError');
const uuid = require("uuid").v4
const bodyparser = require('body-parser')
const config = require('../config/config')
const stripe = require("stripe")(config.stripekey)

const createPayment = async (paymentBody) => {
  const { token, product } = paymentBody;
  Payment.create(product);
  console.log("product:" ,product);
  // if (await Payment.isProductTaken(token.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email  has already purchased the product');
  // }
  Product.create(product);
  console.log("token",token);
  // const customer = await stripe.customers.create({
  //       email: token.email,
  //       source:token.id
  // }).catch((err) => { console.error(' STRIPE ERROR: ', error); })
  // console.log("customer",customer);
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