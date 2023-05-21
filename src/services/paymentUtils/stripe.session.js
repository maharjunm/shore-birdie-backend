const { Payment, Job } = require('../../models');
const config = require('../../config/config');
const stripe = require("stripe")(config.stripekey);
const moment = require('moment');
const { createJob } = require('../job.service');
const { sendMail } = require('../email.service');
const { getProductById } = require('../product.service');


const createSession = async (form,product, email,userId) => {
  form.dates.postingDate = moment(Date.now());
  form.dates.expiryDate = moment(Date.now()).add(product.hostingTime,'days');
  form.productType=product.type;
  const {jobId} = await createJob(form,userId);
  console.log(jobId);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.productId, 
        quantity: 1,
      },
    ],
    customer_email:email,
    billing_address_collection: 'required',
    mode: 'payment',
    success_url: `${config.backendUrl}/v1/checkout/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.productId}&jobId=${jobId}`,
    cancel_url: `${config.backendUrl}/v1/checkout/cancel`,
  });
  return {
    "url": session.url,
  };
}

const validateSession = async (session_id, productId,jobId )=> {
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if(!session || session.payment_status!='paid'){
    return null;
  }
  const product = await getProductById(productId);
  const job = await Job.updateOne({_id: jobId},{$set:{ paymentStatus: true}});
  const { email, name, address } = session.customer_details;
  console.log(session);
  const paymentBody = {
    paymentId: session.id,
    payment_intent: session.payment_intent,
    type: product.type,
    productId:product.productId,
    name: name,
    email: email,
    address: address,
  }
  const paymentStatus = await  Payment.create(paymentBody);
  const { fromemail } = config;
  const data ='Dear '+name+',\n\nPayment of '+product.type+' completed successfully'+
  'Your payment reference no is '+paymentStatus.paymentId +
  'for any queries contact us in '+ `${config.frontendUrl}/#/`
  const subject = 'Request of Job Posting';
  const mailStatus = await sendMail(fromemail,email,data,subject);
  
  return {status:job.nModified!=0, product:product};
}

module.exports = { createSession, validateSession };