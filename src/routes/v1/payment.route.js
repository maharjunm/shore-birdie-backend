const express = require('express');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

  router
    .route('/')
    .post(validate(paymentValidation.createPayment),  paymentController.createPayment)

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