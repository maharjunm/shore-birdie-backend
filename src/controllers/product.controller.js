const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const getProducts = catchAsync(async (req,res)=>{
  const products = await productService.getProducts();
  res.send(products);
})

const updateProduct = catchAsync(async (req,res)=>{
  const { product } = req.body;
  const { productType } = product;
  const status = await  productService.updateProduct(productType,product);
  res.send(status);
})
module.exports = {
  getProducts,
  updateProduct,
};