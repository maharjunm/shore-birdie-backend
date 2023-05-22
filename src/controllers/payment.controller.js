const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const getPayments = catchAsync(async (req,res) => {
  const payments = await paymentService.getPayments(req.query.role);
  res.status(httpStatus.CREATED).send(payments);
})

const checkout = catchAsync(async  (req,res) =>{
  const { email, userId }  = req.cookies;
  const { form, product } = req.body;
  const { url }  = await paymentService.checkout(form,product.product,email,userId);
  res.json({url:url});
})
const success = catchAsync(async (req,res) => {
  const { email } = req.cookies; 
  const { session_id, jobId, productId } = req.query;
  const { url, message } = await paymentService.success(session_id,productId,jobId,email);
  res.redirect(`${url}?message=${message}`);
})
module.exports = {
  getPayments,
  checkout,
  success
};