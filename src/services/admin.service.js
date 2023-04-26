const express= require('express');
const { Job }=require('../models/index');
const userModel = require('../models/userModel');
const mongoose=require('mongoose');
const getJobs= async()=>{
  return Job.find({status:'Pending'});
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
  return updatedJob;
}
module.exports={
  getJobs,
  updateJobStatus,
  setJobStatus
}