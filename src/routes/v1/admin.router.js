const express = require('express');
const { adminController }=require('../../controllers/index');
const router= express.Router();

router.route('/').get(adminController.getJobs);
router.route('/:id').put(adminController.updateStatus);

module.exports= router;