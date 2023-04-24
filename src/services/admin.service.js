const express= require('express');
const { Job }=require('../models/index');
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

module.exports={
  getJobs,
  updateJobStatus
}