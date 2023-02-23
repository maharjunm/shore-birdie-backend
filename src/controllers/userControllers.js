const catchAsync = require('../utils/catchAsync');
const { userServices } = require('../services');

const signup = catchAsync(async (req, res) => {
  const user = await userServices.signup(req.body);
  res.status(201).send(user);
});

const login = catchAsync(async (req, res) => {
  const user = await userServices.login(req.body);
  res.status(200).send(user);
});

const logout = async (req,res)=>{
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send('uesr Logout');
}

module.exports = {
  signup,
  login,
  logout
}