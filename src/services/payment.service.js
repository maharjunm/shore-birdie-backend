const { Payment } = require('../models');
const userModel = require('../models/userModel');
const config = require('../config/config');
const moment = require('moment');
const { regularPayment } = require('./paymentUtils/regular.payment');
const { createSession, validateSession } = require('./paymentUtils/stripe.session');
const { createJob } = require('./job.service');

const checkout = async (form,product,email,userId) => {
  if(await userModel.isAdmin(email)){
    form.status = "Approved";
    form.dates.postingDate = moment(Date.now());
    form.dates.expiryDate = moment(Date.now()).add(product.hostingTime,'days');
    form.productType=product.type;
    const res = await createJob(form,userId);
    const successMessage = 'Job Posted Successfully';
    const failureMessage = 'Failed to Post Jobs';
    if(res.status){
      return {
        "url":`${config.frontendUrl}/#/success?message=${successMessage}`,
      }
    }
    return {
      "url":`${config.frontendUrl}/#/cancel?message=${failureMessage}`
    }
  }
  if(product.type==='Regular'){
    return await regularPayment(form,product,userId);
  }
  return await createSession(form,product,email);
};

const success = async (session_id,product,form,userId) => {
  if(!session_id || !product || !form){
    return {
      "url": `${config.frontendUrl}/#/cancel`,
      "message": "Failed to Post Job Try Again Later",
    }
  }
  const status = await  validateSession(session_id,product,form,userId);
  if(!status){
    return {
      "url": `${config.frontendUrl}/#/cancel`,
      "message": "Failed to Post Job Try Again Later",
    }
  }
  return {
    "url": `${config.frontendUrl}/#/success`,
    "message": "Job Posted Successfully",
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

module.exports = { getPayments, checkout, success};