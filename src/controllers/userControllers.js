const { connect } = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

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

    const token = jwt.sign({email :result.email,id : result._id},process.env.SECRET_KEY);
    res.status(201).json({token :token});

  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "something went wrong "})
  }

}
// login code

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

    const token = jwt.sign({email : exsistingUser.email, id : exsistingUser._id},process.env.SECRET_KEY);
    res.status(200).json({ token :token});

    res.cookie("jwtoken",token,{
      expires : new Date(Date.now() + 25892000000),
      httpOnly : true
    });
    
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "something went wrong "})
  }
}

const logout = async (req,res)=>{
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send('uesr Lgouto');
}

module.exports = {
  login, 
  signup, 
  logout,
}
