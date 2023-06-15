const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const config = require('../config/config');
const moment = require('moment');


const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const signup = catchAsync(async (req, res) => {
  const {username,token,email,userId,isAdmin} = await userService.signup(req.body);
  res.cookie('username',username,{
    expires: new Date(moment (Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('jwtoken',token,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('email',email,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('userId',userId,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ token: token,isAdmin: isAdmin });
});

const login = catchAsync(async (req, res) => {
  const {username,token,email,userId,isAdmin, status,message} = await userService.login(req.body);
  res.cookie('username',username,{
    expires: new Date(moment (Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('jwtoken',token,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('email',email,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  }).cookie('userId',userId,{
    expires: new Date(moment(Date.now()).add(config.tokenExpiryDays,'days')),
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ token: token,isAdmin: isAdmin });
});

const logout = catchAsync(async (req,res)=>{
  const { jwtoken, email, username, userId } = req.cookies;
  jwtoken && res.clearCookie('username',{path:'/'});
  email && res.clearCookie('jwtoken',{path:'/'});
  username && res.clearCookie('email',{path:'/'});
  userId && res.clearCookie('userId',{path:'/'});
  res.status(200).send('user Logout');
 
})
const resetPassword = catchAsync(async (req,res) => {
  const passwords = req.body;
  const userId=req.cookies.userId;
  const status = await userService.resetPassword(userId,passwords);
  res.send(status);
})

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
  signup,
  login,
  logout
};
