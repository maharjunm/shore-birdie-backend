const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');
const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});
const getPayments = catchAsync(async (req,res) => {
  const payments = await paymentService.getPayments(req.query.role);
  res.status(httpStatus.CREATED).send(payments);
})
const updatePaymentStatus = catchAsync(async (req,res) =>{
  const { email } = req.cookies;
  const status = await paymentService.updatePaymentStatus(email);
  res.status(httpStatus.CREATED).send(status);
})
const getPaymentStatus = catchAsync(async (req,res) =>{
  const { email } = req.cookies;
  const status = await paymentService.getPaymentStatus(email);
  res.status(httpStatus.CREATED).send(status);
})
const checkout = catchAsync(async  (req,res) =>{
  const { email, userId }  = req.cookies;
  const { form, product } = req.body;
  const { url }  = await paymentService.checkout(form,product.product,email,userId);
  res.json({url:url});
})
const success = catchAsync(async (req,res) => {
  const { userId } = req.cookies; 
  const { session_id, formBody, productBody } = req.query;
  const product = productBody && JSON.parse(productBody);
  const form = formBody && JSON.parse(formBody);
  const { url, message } = await paymentService.success(session_id,product,form,userId);
  res.redirect(`${url}?message=${message}`);
})
module.exports = {
  createPayment,
  getPayments,
  updatePaymentStatus,
  getPaymentStatus,
  checkout,
  success
};