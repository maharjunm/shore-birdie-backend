const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const uuid = require("uuid").v4
const stripe = require("stripe")(config.stripekey);
const bodyparser = require('body-parser')

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
  try{
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
        "msg":"payment successfull",
        "token":token,
        "product":product
      }
    };
  }catch(err){
    return {
      "title":"stripe payment info",
      "status":"failed",
      "information":{
        "msg":"payment failed",
        "error":err,
      }
    };
  }
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