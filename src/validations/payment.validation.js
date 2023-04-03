const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys(
    {
      regularPayment: Joi.boolean().required(),
      name: Joi.string().required(),
      email:  Joi.string().required().email(),
      address:{
        city:  Joi.string().required(),
        country:  Joi.string().required(),
        line1:  Joi.string(),
        line2: Joi.string(),
        postal_code:  Joi.number().required(),
        state:  Joi.string().required(),
      },
      product: {
        type: Joi.string().required(),
        amount: Joi.number().required(),
        hostingTime: Joi.number().required(),
        offers: Joi.array().required(),
      }
  }),
};

module.exports =  createPayment;
