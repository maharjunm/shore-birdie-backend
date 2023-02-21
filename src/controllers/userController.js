const { userServices } = require("../services");

const login = async(req,res)=>{
  const user = await userServices.login(req.body);
  res.status(201).send(user);
};

const signup = async(req,res)=>{
  const user = await userServices.signup(req.body);
  res.status(201).send(user);
};

module.exports ={
  login,
  signup
};
