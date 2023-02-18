const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { signup, login } = require('../../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get((req,res)=> {
    console.log(req.body);
    res.json({
      title:"test route",
      status:"connected",
      desc:req.body,
    })
  });

module.exports = router;