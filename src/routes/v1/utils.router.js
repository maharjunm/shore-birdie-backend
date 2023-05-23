const express=require('express');
const { jobController }=require('../../controllers/index');

const router=express.Router();

router
  .route('/discipline')
  .get(jobController.getDiciplines);
router
  .route('/titles')
  .get(jobController.getTitles);
router
  .route('/sector')
  .get(jobController.getSectors);
router
  .route('/region')
  .get(jobController.getRegions);


module.exports = router;