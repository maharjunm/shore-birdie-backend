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
  const status = await paymentService.updatePaymentStatus(req.query.email);
  res.status(httpStatus.CREATED).send(status);
})
const getPaymentStatus = catchAsync(async (req,res) =>{
  const status = await paymentService.getPaymentStatus(req.query.email);
  res.status(httpStatus.CREATED).send(status);
})

module.exports = {
  createPayment,
  getPayments,
  updatePaymentStatus,
  getPaymentStatus
};