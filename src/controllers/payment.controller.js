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
  const { email }  = req.cookies;
  const { url }  = await paymentService.checkout(req.body,email);
  res.redirect(url);
})
const success = catchAsync(async (req,res) => {
  const { session_id, paymentBody  } = req.query;
  const product = paymentBody && JSON.parse(paymentBody);
  const { url, message } = await paymentService.success(session_id,product);
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