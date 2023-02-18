const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const stripe = require("stripe")("sk_test_51MUr0rSCXoMBK86oijlwSA5ws6Pk8fNWGhTSHG6VOfRaM01Mk7yC7I7MeUunfTY4u1TvyL4lrkspamPKIImPvmp800Ma3ybMd0")
const uuid = require("uuid").v4
const bodyparser = require('body-parser')




/**
 * Create a user
 * @param {Object} paymentBody
 * @returns {Promise<User>}
 */
const createPayment = async (paymentBody) => {
  const { token, product } = paymentBody;
  if (await Payment.isProductTaken(token.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email  has already purchased the product');
  }

  try{

    const customer = stripe.customers.create({
      email: token.email,
      source:token.id
    });
    const key = uuid()
    const charge = stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "eur",
        customer: customer.id,
        receipt_email: token.email,
        key:key,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
    );
    console.log("success ra");
    // return Payment.create(paymentBody);

  }catch(err){
    console.log(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }

};

module.exports = {createPayment};