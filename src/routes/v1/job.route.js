const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router
  .route('/')
  .post(jobController.createJob)
router
  .route('/get')
  .get(jobController.getJobs);
router
  .route('/:user')
  .get(jobController.getJobCreatedById);
router
  .route('/:id')
  .put(jobController.updateJobStatus)


module.exports = router;