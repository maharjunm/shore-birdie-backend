const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router.route('/').post(jobController.CreateJob);
router.route('/').get(jobController.GetJob);


module.exports = router;