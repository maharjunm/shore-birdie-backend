const { connect } = require('mongoose');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');

const SECRET_KEY = "NOTESAPI";

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
      username :username
    });

    const token = jwt.sign({email :result.email,id : result._id},SECRET_KEY);
    res.status(201).json({user : result, token :token});

  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "something went wrong "})
  }

}

// sign-in code

const signin = async (req,res)=>{

  const { email , password } = req.body;

  try{
    const exsistingUser = await userModel.findOne({email : email});
    if(!exsistingUser){
      return res.status(404).json({message : "user not found"});
    }

    const matchPassword = await bcryptjs.compare(password,exsistingUser.password);

    if(!matchPassword){
      return res.status(404).json({message : "user not found"});
    }

    const token = jwt.sign({email : exsistingUser.email, id : exsistingUser._id},SECRET_KEY);
    res.status(201).json({user : exsistingUser, token :token});
    
  }
  catch(error){
    onsole.log(error)
    res.status(500).json({message : "something went wrong "})
  }

}

module.exports = {signin , signup}