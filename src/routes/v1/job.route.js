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
router
  .route('/recomended')
  .get(jobController.getRecomendedJobs);


module.exports = router;