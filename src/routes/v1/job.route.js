const express=require('express');
const { jobController }=require('../../controllers/index');
const authValidate = require('../../middlewares/authValidate');

const router=express.Router();

router.route('/').post(jobController.CreateJob).get(jobController.GetJob);
router.route('/:user').get(jobController.getJobCreatedById);


module.exports = router;