const express=require('express');
const { jobController }=require('../../controllers/index');
const authValidate = require('../../middlewares/authValidate');

const router=express.Router();

router.route('/').post(jobController.CreateJob).get(jobController.GetJob);
router.route('/user').get(authValidate,jobController.getJobCreatedByUser);


module.exports = router;