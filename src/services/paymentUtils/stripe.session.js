const { Payment } = require('../../models');
const config = require('../../config/config');
const stripe = require("stripe")(config.stripekey);
const moment = require('moment');


const createSession = async (paymentBody, email) => {
  const product = JSON.parse(paymentBody.product);
  const { platinum_id, diamond_id } = config;
  const product_id = product.type==='Platinum'?platinum_id:diamond_id;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product_id, 
        quantity: 1,
      },
    ],
    customer_email:email,
    billing_address_collection: 'required',
    mode: 'payment',
    success_url: `${config.backendUrl}/v1/checkout/success?session_id={CHECKOUT_SESSION_ID}&paymentBody=${paymentBody.product}`,
    cancel_url: `${config.backendUrl}/v1/checkout/cancel`,
  });
  return {
    "url": session.url,
  };
}

const validateSession = async (session_id, product )=> {
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if(!session || session.payment_status!='paid'){
    return null;
  }
  const { email, name, address } = session.customer_details;
  const paymentExist = await Payment.findOne({'email':email});
  if(paymentExist){
    paymentExist.expiryDate = moment(Date.now()).add(config.paymentExpiryDays,'days'),
    paymentExist.status = true,
    paymentExist.name = name,
    paymentExist.email = email,
    paymentExist.address = address,
    paymentExist.product = product,
    await paymentExist.save();
    return paymentExist;
  }
  const paymentBody = {
    expiryDate : moment(Date.now()).add(config.paymentExpiryDays,'days'),
    status : true,
    name: name,
    email: email,
    address: address,
    product: product,
  }
  const status = await  Payment.create(paymentBody);
  return status;
}

module.exports = { createSession, validateSession };