const httpStatus = require('http-status');
const { User } = require('../models');
const userModel = require('../models/userModel');
const ApiError = require('../utils/ApiError');
const bcryptjs = require('bcryptjs');
const { connect } = require('mongoose');
const jwt = require('jsonwebtoken');
const { auth } = require('../config/config');
const moment = require('moment');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const resetPassword = async (userId,passwords)=>{
  const { oldPassword, newPassword } = passwords;
  const exsistingUser = await userModel.findOne({userId : userId});
  if(!exsistingUser){
    throw new Error('User Does not exist');
  }
  const matchPassword = await bcryptjs.compare(oldPassword,exsistingUser.password);
  if(!matchPassword){
    throw new Error('Incorrect Password');
  }
  const hashedPassword = await bcryptjs.hash(newPassword,10);
  exsistingUser.password = hashedPassword;
  await exsistingUser.save();
  return {
    "status":true,
    "message":"Password Changed Successfully",
  }
}

const signup = async (body)=>{
  const {username,email,password} = body;
  const exsistingUser = await userModel.findOne({email: email});
  if(exsistingUser){
    throw Error('user already exsist');
  }
  const hashedPassword = await bcryptjs.hash(password,10);
  const result = await userModel.create({
    email : email,
    password :hashedPassword,
    username : username,
    userId : uuidv4(),
  });
  const token = jwt.sign({email :result.email,id : result._id},auth);
  const isAdmin = await userModel.isAdmin(email);
  const { userId } = exsistingUser;
  return {username,token,email,userId,isAdmin}; 
}

const login = async (body)=>{
  const { email , password } = body;
  const exsistingUser = await userModel.findOne({email : email});
  if(!exsistingUser){
    return {status:400,message:"user not found"};
  }
  const matchPassword = await bcryptjs.compare(password,exsistingUser.password);
  if(!matchPassword){
    return {status:400,message:"Given Password is Wrong"};
  }
  const token = jwt.sign({email : exsistingUser.email, id : exsistingUser._id},auth);
  const isAdmin = await userModel.isAdmin(email);
  const { username, userId} =  exsistingUser;
  return { username,token,email,userId,isAdmin};
}
module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  resetPassword,
  login, 
  signup,
};
