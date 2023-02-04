const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

  router
    .route('/checkout')
    .post((req,res)=>{
      console.log("Listening to payment");
      console.log(req);
    })
module.exports = router;