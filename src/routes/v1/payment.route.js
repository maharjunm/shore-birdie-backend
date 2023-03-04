const express = require('express');
const {Product} = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

  router
    .route('/')
    // .post(validate(paymentValidation.createPayment),paymentController.createPayment)
    .post((req,res)=>{
      console.log("body" ,req.body);
      const {token ,product} = req.body;
      Product.create(product);
      res.json({
        "title":"stripe payment info",
        "status":"success",
        "information":{
          "token":token,
          "product":product
        }
      });
    })
    .get(async (req,res)=>{
      const chary= await Product.find();
      res.json({
        "title":"payment details info",
        "status":"success",
        "result": chary
      })
    })
    
module.exports = router;