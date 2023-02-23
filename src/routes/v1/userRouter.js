const express = require('express');
const { login, signup, logout } = require('../../controllers/userControllers');
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/logout', logout);

userRouter.post('/',(req,res)=>{
  res.json({
    message : "authentications here",
  })
})

module.exports = userRouter;