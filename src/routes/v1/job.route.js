const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router.route('/').post(jobController.CreateJob);


module.exports = router;