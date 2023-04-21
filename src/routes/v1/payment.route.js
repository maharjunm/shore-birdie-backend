const express = require('express');
const { Payment } = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');
const config = require('../../config/config');

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
  router
    .route('/page')
    .post(authValidate,paymentController.checkout);
  router
    .route('/success')
    .get(paymentController.success);
  router
    .route('/cancel')
    .get((req,res)=>{
      res.redirect(`${config.frontendUrl}/#/cancel?message=Job Posting Cancelled`);
    });
   
module.exports = router;