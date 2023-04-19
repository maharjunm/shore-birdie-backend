const { Payment } = require('../../models');
const config = require('../../config/config');
const stripe = require("stripe")(config.stripekey);
const moment = require('moment');
const { createJob } = require('../job.service');


const createSession = async (form,product, email) => {
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
    success_url: `${config.backendUrl}/v1/checkout/success?session_id={CHECKOUT_SESSION_ID}&productBody=${JSON.stringify(product)}&formBody=${JSON.stringify(form)}`,
    cancel_url: `${config.backendUrl}/v1/checkout/cancel`,
  });
  return {
    "url": session.url,
  };
}

const validateSession = async (session_id, product,form,userId )=> {
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if(!session || session.payment_status!='paid'){
    return null;
  }
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
  const jobStatus = await createJob(form,userId);
  return jobStatus?true:false;
}

module.exports = { createSession, validateSession };