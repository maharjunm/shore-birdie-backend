const { Payment } = require('../../models');
const config = require('../../config/config');
const moment = require('moment');
const { createJob } = require('../job.service');

const regularPayment = async (form,product,userId) => {
  form.dates.postingDate = moment(Date.now());
  form.dates.expiryDate = moment(Date.now()).add(product.hostingTime,'days');
  const res  = await  createJob(form,userId);
  const successMessage = 'Job Posted Successfully';
  const failureMessage = 'Failed to Post Job';
  if(res.status){
    return {
      "url":`${config.frontendUrl}/#/success?message=${successMessage}`,
    }
  }
  return {
    "url":`${config.frontendUrl}/#/cancel?message=${failureMessage}`
  }
}

module.exports = { regularPayment };