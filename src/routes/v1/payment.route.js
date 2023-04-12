const express = require('express');
const { Payment } = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');
const router = express.Router();
const config = require('../../config/config');

  router
    .route('/')
    .post(paymentController.createPayment)
    .get(paymentController.getPayments);
  router
    .route('/update')
    .get(paymentController.updatePaymentStatus);
  router
    .route('/get')
    .get(paymentController.getPaymentStatus);
  router
    .route('/page')
    .post(paymentController.checkout);
  router
    .route('/success')
    .get(paymentController.success);
    router
    .route('/cancel')
    .get((req,res)=>{
      res.redirect(`${config.frontendUrl}/#/cancel?message=Payment Cancelled`);
    });
   
module.exports = router;