const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const authValidate = require('../../middlewares/authValidate');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

router
  .post('/signup', userController.signup);
  
router
  .post('/login', userController.login);
  
router
  .post('/logout',authValidate, userController.logout);

router
  .post('/changepassword',authValidate,userController.resetPassword );
  
router
  .get('/',authValidate,(req,res)=>{
    res.json({
      message : "authentications here",
    })
  })
  
module.exports = router;