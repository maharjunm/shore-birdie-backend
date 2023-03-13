const express=require('express');
const { jobController }=require('../../controllers/index');
const validate = require('../../middlewares/validate');
const jobvalidation = require('../../validations/jobvalidations')

const router=express.Router();

router.route('/')
      .post(validate(jobvalidation.JobValidate),jobController.CreateJob)
      .get(jobController.GetJob);


module.exports = router;