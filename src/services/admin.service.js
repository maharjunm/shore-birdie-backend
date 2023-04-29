const express= require('express');
const { Job }=require('../models/index');
const config = require('../config/config');
const userModel = require('../models/userModel');
const { sendMail } = require('./email.service');
const mongoose=require('mongoose');
const { PageDefaultLimit } = require('../config/config');

const getJobs= async(page)=>{
  return Job.find({}).limit(parseInt(PageDefaultLimit)).skip(page);
}
const updateJobStatus= async(jobId,status)=>{
  try {
    const jobObjectId = mongoose.Types.ObjectId(jobId);
    const job = await Job.findOne({_id:jobObjectId});
    if (!job) throw new Error('Job not found');
    job.status = status;
    const updatedJob = await job.save();
    
    const { fromemail } = config;
    const data ='Your request of job '+updatedJob.job.title+
    ' has been '+status+' by ADMIN '+
    ' you can check your posted job status in  dashboard  '+`${config.frontendUrl}`
    const subject = 'Request of Posting a Job '+job.title;
    const user = await userModel.findOne({userId:job.createdBy});
    const mailStatus = await sendMail(fromemail,user.email,data,subject);

    return updatedJob;
  } catch (err) {
    throw new Error('Error updating job status');
  }
}

module.exports={
  getJobs,
  updateJobStatus
}