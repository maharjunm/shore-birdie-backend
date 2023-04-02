const { Payment } = require('../../models');
const config = require('../../config/config');
const moment = require('moment');

const regularPayment = async (product, email) => {
  const isRegularTaken = await Payment.isRegularTaken(email);
  if(isRegularTaken) {
    const message = "Regular Card Already Taken";
    return {
      "url": `${config.frontendUrl}/#/cancel?message=${message}`,
    }
  }
  const paymentExist = await Payment.findOne({'email':email});
  if(paymentExist){
    paymentExist.regularPayment = true;
    paymentExist.expiryDate = moment(Date.now()).add(config.paymentExpiryDays,'days'),
    paymentExist.status = true,
    paymentExist.email = email,
    paymentExist.product = product,
    await paymentExist.save();
    const message = "Regular Payment Completed Successfully";
    return {
      "url": `${config.frontendUrl}/#/success?message=${message}`,
    }
  }
  const paymentBody = {
    expiryDate : moment(Date.now()).add(config.paymentExpiryDays,'days'),
    regularPayment: true,
    status : true,
    email: email,
    product: product,
  }
  const status = await  Payment.create(paymentBody);
  if(!status){
    const message = "Regular Payment Failed Try Again Later";
    return {
      "url": `${config.frontendUrl}/#/cancel?message=${message}`,
    }
  }
  const message = "Regular Payment Completed Successfully";
  return {
    "url": `${config.frontendUrl}/#/success?message=${message}`,
  }
}

module.exports = { regularPayment };