const express = require('express');
const { Payment } = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

  router
    .route('/')
    .post(validate(paymentValidation.createPayment),paymentController.createPayment)
    .get(paymentController.getPayments);
  router
    .route('/update')
    .get(paymentController.setPaymentStatus);
  router
  .route('/get')
  .get(paymentController.getPaymentStatus);
   
module.exports = router;