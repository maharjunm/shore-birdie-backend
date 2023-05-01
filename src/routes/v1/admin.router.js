const express = require('express');
const { adminController }=require('../../controllers/');
const { Job } = require('../../models/index');
const authValidate = require('../../middlewares/authValidate');
const router= express.Router();

router.route('/').get(authValidate, adminController.getJobs);
router
  .route('/approve/:id')
  .post( authValidate, adminController.approveJob);
router
  .route('/reject/:id')
  .put(authValidate, adminController.rejectJob);
router
  .route('/reject')
  .get(authValidate, adminController.getRejectedJobs);
module.exports= router;