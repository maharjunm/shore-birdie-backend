const express = require('express');
const {Product} = require('../../models');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

  router
    .route('/')
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
    
module.exports = router;