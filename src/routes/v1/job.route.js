const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router.route('/').post(jobController.CreateJob).get(jobController.GetJob);


module.exports = router;