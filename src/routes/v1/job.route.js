const express=require('express');
const { jobController }=require('../../controllers/index');
const authValidate = require('../../middlewares/authValidate');

const router=express.Router();

router.route('/').post(authValidate,jobController.CreateJob).get(jobController.GetJob);
router.route('/:user').get(authValidate,jobController.getJobCreatedById);


module.exports = router;