const express= require('express');
const { Job }=require('../models/index');
const userModel = require('../models/userModel');
const { PageDefaultLimit } = require('../config/config');
const mongoose=require('mongoose');

const getJobs= async(page,status)=>{
  return Job.find({status:status}).skip(page).limit(parseInt(PageDefaultLimit));
}
const updateJobStatus= async(jobId,status)=>{
  try {
    const jobObjectId = mongoose.Types.ObjectId(jobId);
    const job = await Job.findOne({_id:jobObjectId});
    if (!job) throw new Error('Job not found');
    job.status = status;
    const updatedJob = await job.save();
    return updatedJob;
  } catch (err) {
    throw new Error('Error updating job status');
  }
}
const setJobStatus = async (jobId,status,email)=>{
  if(!(await userModel.isAdmin(email))){
    throw new Error('unauthorised access');
  }
  const jobObjectId = mongoose.Types.ObjectId(jobId);
  const job = await Job.findOne({_id:jobObjectId});
  if (!job) throw new Error('Job not found');
  job.status = status;
  const updatedJob = await job.save();
  console.log(updatedJob);
  return updatedJob;
}
module.exports={
  getJobs,
  updateJobStatus,
  setJobStatus
}