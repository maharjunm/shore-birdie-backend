const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  }),
};

module.exports =  createPayment;
