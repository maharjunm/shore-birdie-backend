const { PageDefaultLimit } = require('../config/config');
const { Job }=require('../models/index');

const createJob= async (jobBody,user)=>{
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  job.createdBy = user;
  job.updatedBy = user;
  await job.save();
  return job;
}
const getJob=async (page)=>{
  const jobs= await Job.find().skip(page).limit(PageDefaultLimit);
  return jobs;
}
const getJobByUser=async(userId) =>{
  return Job.find({createdBy:userId});
}

module.exports={
  createJob,
  getJob,
  getJobByUser
}