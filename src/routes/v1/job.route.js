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
router
  .route('/recomended')
  .get(jobController.getRecomendedJobs);
router
  .route('/get/:id')
  .get(jobController.getJobByJobId);
router
  .route('/search')
  .get(jobController.search);
router
  .route('/highlights')
  .get(jobController.getEachTitleCount);



module.exports = router;