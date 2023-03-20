const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router.route('/')
      .get(jobController.GetJob)
      .post(jobController.CreateJob);


module.exports = router;