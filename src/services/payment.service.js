const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const uuid = require("uuid").v4
const bodyparser = require('body-parser')
const config = require('../config/config')
const stripe = require("stripe")(config.stripekey)

const createPayment = async (paymentBody) => {
  const { token, product } = paymentBody;
  console.log("product:" ,product);
  if (token.email && (await Payment.isProductTaken(token.email))) {
    return {
      "title":"stripe payment info",
      "status":"failed",
      "information":{
        "email":token.email,
        "msg":"email already taken the product",
      }
    }
  }
  Payment.create(paymentBody);
  const customer = await stripe.customers.create({
        email: token.email,
        source:token.id
  }).catch((err) => { console.error(' STRIPE ERROR: ', error); })
  console.log("customer",customer);
  return {
    "title":"stripe payment info",
    "status":"success",
    "information":{
      "token":token,
      "product":product
    }
  };
};

const getPayments = async (role)=>{
  console.log("role",role);
  if(role!="admin"){
    return {
      "title":"stripe payments",
      "status":"failed",
      "mesg" :"not authorised person to view payments"
    }
  }
  const payments = await Payment.getPayments();
  return payments;
}

module.exports = {createPayment, getPayments};