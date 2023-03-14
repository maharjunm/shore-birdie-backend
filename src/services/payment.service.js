const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const uuid = require("uuid").v4
const stripe = require("stripe")(config.stripekey);
const bodyparser = require('body-parser')
const moment = require('moment');

const createPayment = async (paymentBody) => {
  const { token, product } = paymentBody;

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
    paymentBody.expiryDate = moment(Date.now()).add(config.expiryDays,'days');
    paymentBody.status = true;
    Payment.create(paymentBody);
    const customer = await stripe.customers.create({
        email: token.email,
        source:token.id
    }).catch((err) => { console.error(' STRIPE ERROR: ', error); })

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

const getPaymentStatus = async (email) =>{
  try{
    const payment = await Payment.getPaymentStatus(email);
    return {
      "message": "success",
      "status": payment.status,
      "expiryDate": payment.expiryDate,
      "product": payment.product
    }
  }catch(err){
    return {
      "message": "failed to get payment status",
      "status": false,
      "expiryDate": null
    };
  }
};

const updatePaymentStatus = async (email) =>{
  try{
    const status = await Payment.updatePaymentStatus(email);
    const message = status.nModified == 0 ? "Already upto date" : "successfully updated";
    return {
      "message":message,
      "status":message,

    }
  }catch(err){
    return {
      "status":"failed to update payment status",
    };
  }
}
const getPayments = async (role)=>{
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

module.exports = {createPayment, getPayments, updatePaymentStatus, getPaymentStatus};