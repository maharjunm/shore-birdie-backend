const express = require('express');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/user.controller');
const bodyparser = require('body-parser')
const cors = require('cors');
const stripe = require("stripe")("sk_test_51MUr0rSCXoMBK86oijlwSA5ws6Pk8fNWGhTSHG6VOfRaM01Mk7yC7I7MeUunfTY4u1TvyL4lrkspamPKIImPvmp800Ma3ybMd0")
const uuid = require("uuid").v4
const router = express.Router();

  router
    .route('/')
    .post(validate(paymentValidation.createPayment), (req,res)=>paymentController.createPayment)
    // .post(async (req,res)=>{
    //   console.log("Request:", req.body);
    //   let error, status
    //   try{
    //     const response = await paymentController.checkOut(req,res);
    //     try{
    //       const {token, product} = req.body;
    //       const user = await paymentService.checkOut({token,product});
    //       console.log(user);
    //      res.status(httpStatus.CREATED).send(user);
    //     }catch(err){
    //       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    //     }
        
    //   }
    //   catch(error){
    //     console.log(error)
    //     status = "failure";
    //   }
    //   res.json({error,status});
    // })
module.exports = router;