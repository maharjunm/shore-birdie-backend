const express = require('express');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

  router
    .route('/')
    .post(validate(paymentValidation.createPayment),  paymentController.createPayment)
module.exports = router;