const jwt = require('jsonwebtoken');
const { auth } = require('../config/config');
const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');


const authValidate = catchAsync(async (req, res, next) => {
  const { jwtoken, email } = req.cookies;
  if(!jwtoken) throw new Error('token does not exist or expired');
  await jwt.verify(jwtoken,auth,async (err,token) => {
    if(err) throw new Error('invalid token');

    const existingUser = await userModel.findOne({email : token.email});
    if(!existingUser) {
      res.clearCookie('jwtoken');
      throw new Error('user does not exist');
    } 
    if(email!=token.email) throw new Error('unauthorised user');
    next();
  })
});
module.exports = authValidate;
