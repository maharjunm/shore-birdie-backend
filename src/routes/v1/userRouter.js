const express = require('express');
const { login, signup, logout } = require('../../services/userServices');
const authValidate = require('../../middlewares/authValidate');
const userRouter = express.Router();


userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.post('/logout',authValidate, logout);

userRouter.get('/',authValidate,(req,res)=>{
  res.json({
    message : "authentications here",
  })
})

module.exports = userRouter;