const express = require('express');
const { Payment } = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');

  router
    .route('/')
    .post(authValidate,validate(paymentValidation.createPayment),paymentController.createPayment)
    .get(paymentController.getPayments);
  router
    .route('/update')
    .get(authValidate,paymentController.updatePaymentStatus);
  router
    .route('/get')
    .get(authValidate,paymentController.getPaymentStatus);
   
module.exports = router;