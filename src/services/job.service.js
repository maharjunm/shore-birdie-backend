const { PageDefaultLimit } = require('../config/config');
const { Job, Payment } = require('../models/index');
const userModel = require('../models/userModel');

const createJob= async (jobBody,userId)=>{
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  job.createdBy = userId;
  job.updatedBy = userId;
  await job.save();
  return {
    "status":true,
    "message": "Successfully posted job",
  };
}

const getJobs=async (page)=>{
  const jobs= await Job.find().skip(page).limit(parseInt(PageDefaultLimit));
  return jobs;
}
const getJobsById=async(userId) =>{
  return Job.find({createdBy:userId});
}

module.exports={
  createJob,
  getJobs,
  getJobsById
}