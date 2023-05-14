const express = require('express');
const { Product } = require('../../models');
const validate = require('../../middlewares/validate');
const router = express.Router();
const authValidate = require('../../middlewares/authValidate');
const { productController } = require('../../controllers');

router
  .route('/get')
  .get(productController.getProducts);
router
  .route('/update')
  .post(productController.updateProduct);

module.exports = router;