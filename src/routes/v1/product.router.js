const express = require('express');
const { Product } = require('../../models');
const validate = require('../../middlewares/validate');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');

router
  .route('/get')
  .get(async (req,res)=>{
    const products = await Product.find();
    res.send(products);
  })
module.exports = router;