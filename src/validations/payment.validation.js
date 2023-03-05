const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys(
    {
      token: {
          id: Joi.string().required(),
          object:Joi.string().required(),
          card: {
              id: Joi.string().required(),
              object:Joi.string().required(),
              address_city: Joi.string().required(),
              address_country: Joi.string().required(),
              address_line1:Joi.string().required(),
              address_line1_check: Joi.string().required(),
              address_line2: Joi.string(),
              address_state: Joi.number(),
              address_zip: Joi.number().required(),
              address_zip_check: Joi.string(),
              brand: Joi.string(),
              country: Joi.string(),
              cvc_check: Joi.string(),
              dynamic_last4: Joi.string(),
              exp_month: Joi.number().required(),
              exp_year: Joi.number().required(),
              funding: Joi.string().required(),
              last4: Joi.number().required(),
              name:Joi.string().required(),
              tokenization_method: Joi.string(),
          },
          client_ip: Joi.string(),
          created: Joi.number().required(),
          email: Joi.string().required().email(),
          livemode: Joi.boolean(),
          type: Joi.string().required(),
          used: Joi.boolean(),
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
