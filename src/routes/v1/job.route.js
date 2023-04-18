const express=require('express');
const { jobController }=require('../../controllers/index');
const authValidate = require('../../middlewares/authValidate');

const router=express.Router();

router
  .route('/')
  .post(authValidate,jobController.createJob)
  .get(jobController.getJobs);
router
  .route('/user')
  .get(authValidate,jobController.getJobCreatedById);



module.exports = router;