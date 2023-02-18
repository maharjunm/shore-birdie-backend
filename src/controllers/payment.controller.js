const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');
const stripe = require("stripe")("sk_test_51MUr0rSCXoMBK86oijlwSA5ws6Pk8fNWGhTSHG6VOfRaM01Mk7yC7I7MeUunfTY4u1TvyL4lrkspamPKIImPvmp800Ma3ybMd0")
const uuid = require("uuid").v4
const bodyparser = require('body-parser')

const checkOut = catchAsync(async (req, res) => {
  try{
    const {token, product} = req.body;
    const user = await paymentService.checkOut({token,product});
    console.log(user);
   res.status(httpStatus.CREATED).send(user);
  }catch(err){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
  
});
module.exports = {
  checkOut,
};