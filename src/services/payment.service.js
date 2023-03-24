const httpStatus = require('http-status');
const { UserPayment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const uuid = require("uuid").v4
const stripe = require("stripe")(config.stripekey);
const bodyparser = require('body-parser')
const moment = require('moment');

const createPayment = async (paymentBody) => {
  const { email, product } = paymentBody;
  const isTaken = await UserPayment.isProductTaken(email);
  if(email && isTaken ){
    console.log("came");
    return {
      "title":"stripe payment info",
      "status":"failed",
      "email": email,
      "message": "email already taken the product",
    }
  }
  try{
    paymentBody.expiryDate = moment(Date.now()).add(config.paymentExpiryDays,'days');
    paymentBody.status = true;
    const status = await UserPayment.create(paymentBody);
    const response = status?"success":"Failure";
    return {
      "status":response,
      "email": email,
      "product": product,
      "message": "payment successfull",
    }
  }catch(err){
    console.log(err);
    return {
      "status":"failed to save payment status",
      "email": email,
      "product": product,
    };
  }
};

const getPaymentStatus = async (email) =>{
  try{
    const payment = await UserPayment.getPaymentStatus(email);
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
    const status = await UserPayment.updatePaymentStatus(email);
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
  const payments = await UserPayment.getPayments();
  return payments;
}
module.exports = {createPayment, getPayments, updatePaymentStatus, getPaymentStatus};