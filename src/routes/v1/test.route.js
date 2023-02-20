const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req,res)=>{
    res.json({
      "title": "Test route api ",
      "status": "successfully connected",
      "description":"Testing route",
    })
  });

module.exports = router;