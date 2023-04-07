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
const getJob=async ()=>{
  return Job.find();
}
const getJobById=async(user,page) =>{
  return Job.find({createdBy:user}).limit(PageDefaultLimit).skip(page);
}

module.exports={
  createJob,
  getJob,
  getJobById
}