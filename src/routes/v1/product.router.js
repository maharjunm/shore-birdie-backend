const express = require('express');
const { Product } = require('../../models');
const validate = require('../../middlewares/validate');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');

router
  .route('/get')
  .get(async (req,res)=>{
    res.send(await Product.find());
  })
module.exports = router;