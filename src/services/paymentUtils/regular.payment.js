const { Payment } = require('../../models');
const config = require('../../config/config');
const moment = require('moment');
const { createJob } = require('../job.service');
const { sendMail } = require('../email.service');

const regularPayment = async (form,product,userId,email) => {
  form.dates.postingDate = moment(Date.now());
  form.dates.expiryDate = moment(Date.now()).add(product.hostingTime,'days');
  form.productType=product.type;
  const res  = await  createJob(form,userId);
  const successMessage = 'Job Posted Successfully';
  const failureMessage = 'Failed to Post Job';
  if(res.status){

    const { fromemail } = config;
    const data ='Request for posting Job '+form.job.title+' under '+product.type+' category by '+email+
    ' is succesfull \n\n'+' You will receive confirmation mail regarding the status of job shortly'+
    ' you can check status of job in your dashboard  '+`${config.frontendUrl}/#/userdashboard`
    const subject = 'Request of Posting a Job '+form.job.title;
    const mailStatus = await sendMail(fromemail,email,data,subject);
    
    return {
      "url":`${config.frontendUrl}/#/success?message=${successMessage}`,
    }
  }
  return {
    "url":`${config.frontendUrl}/#/cancel?message=${failureMessage}`
  }
}

module.exports = { regularPayment };