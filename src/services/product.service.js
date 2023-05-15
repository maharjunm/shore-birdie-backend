const config = require('../config/config');
const userModel = require('../models/userModel');
const { Product } = require('../models');

const getProducts = async ()=>{
  const products = await Product.find();
  if(!products) throw new Error('Server Error');
  return products;
}
const updateProduct = async (productType,product,email)=>{
  if(!(await userModel.isAdmin(email))){
    throw new Error('unauthorised access');
  }
  const status = await Product.updateOne({productType:productType,_id:product._id},{$set:product});
  if(status.nModified==0) throw new Error('Failed');
  return {
    "message":"success",
  }
}

module.exports = { getProducts,updateProduct };