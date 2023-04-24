const express = require('express');
const paymentController = require('../../controllers/payment.controller');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');
const config = require('../../config/config');

  router
    .route('/')
    .get(paymentController.getPayments);
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