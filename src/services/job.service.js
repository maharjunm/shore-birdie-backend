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
const getJobById=async(userId) =>{
  return Job.find({createdBy:userId});
}

module.exports={
  createJob,
  getJob,
  getJobById
}