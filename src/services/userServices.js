const { connect } = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { auth } = require('../config/config');
const moment = require('moment');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid');

//sign-up code

const signup = async (req,res)=>{

  const {username,email,password} = req.body;
  try{
   
    const exsistingUser = await userModel.findOne({email : email});

    if(exsistingUser){
      return res.status(400).json({message : "user already exsist"});
    }

    const hashedPassword = await bcryptjs.hash(password,10);

    const result = await userModel.create({
      email :email,
      password :hashedPassword,
      username :username,
      userId : uuidv4(),
    });

    const token = jwt.sign({email :result.email,id : result._id},auth);
    res.status(201).json({token :token});

  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "something went wrong "})
  }

}

const login = async (req,res)=>{

  const { email , password } = req.body;

  try{
    const exsistingUser = await userModel.findOne({email : email});
    if(!exsistingUser){
      return res.status(404).json({message : "user not found"});
    }

    const matchPassword = await bcryptjs.compare(password,exsistingUser.password);


    if(!matchPassword){
      return res.status(400).json({message : "Given Password is Wrong"});
    }

    const token = jwt.sign({email : exsistingUser.email, id : exsistingUser._id},auth);
    res.cookie('username',exsistingUser.username,{
      expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
      httpOnly: true,
      secure: true,
    }).cookie('jwtoken',token,{
      expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
      httpOnly: true,
      secure: true,
    }).cookie('email',exsistingUser.email,{
      expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
      httpOnly: true,
      secure: true,
    }).cookie('userId',exsistingUser.userId,{
      expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
      httpOnly: true,
      secure: true,
    });
    const isAdmin = exsistingUser.role==='admin'?true:false;
    res.status(200).json({ token: token,isAdmin: isAdmin });
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "something went wrong "})
  }
}

const logout = async (req,res)=>{
  const { jwtoken, email, username, userId } = req.cookies;
  jwtoken && res.clearCookie('username',{path:'/'});
  email && res.clearCookie('jwtoken',{path:'/'});
  username && res.clearCookie('email',{path:'/'});
  userId && res.clearCookie('userId',{path:'/'});
  res.status(200).send('user Logout');
}

module.exports = {
  login, 
  signup,
  logout,
}