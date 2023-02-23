const express = require('express');
const { login, signup, logout } = require('../../services/userServices');
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/logout', logout);

userRouter.get('/',(req,res)=>{
  res.json({
    message : "authentications here",
  })
})

module.exports = userRouter;