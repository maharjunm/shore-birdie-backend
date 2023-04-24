const express=require('express');
const { jobController }=require('../../controllers/index');
const authValidate = require('../../middlewares/authValidate');

const router=express.Router();

router
  .route('/')
  .get(jobController.getJobs);
router
  .route('/user')
  .get(authValidate,jobController.getJobsCreatedById);



module.exports = router;