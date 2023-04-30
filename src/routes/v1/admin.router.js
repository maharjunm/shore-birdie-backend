const express = require('express');
const { adminController }=require('../../controllers/');
const { Job } = require('../../models/index')
const authValidate = require('../../middlewares/authValidate');
const router= express.Router();

router.route('/').get(authValidate, adminController.getJobs);
router
  .route('/approve')
  .post( authValidate, adminController.approveJob);
router
  .route('/reject')
  .post( authValidate, adminController.rejectJob)
  .get(async (req,res)=> {
    res.send(await Job.find({'status':'Rejected'}));
  })
module.exports= router;