const { Job, Payment }=require('../models');
const userModel = require('../models/userModel');
const mongoose=require('mongoose');


const createJob= async (jobBody,email)=>{
  const user = await userModel.findOne({email : email});
  if(!user){
    throw new Error('user does not exist');
  }
  const payment = await Payment.getPaymentStatus(email);
  if(!payment || !payment.status){
    throw new Error('Payment not done yet');
  }
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  job.createdBy = email;
  job.updatedBy = email;
  await job.save();
  return {
    "status":"success",
    "message": "posted job successfully",
  }
}
const getJobs = async (query)=>{
  const { status, role } = query;
  if(role && role!='ADMIN'){
    throw new Error("access denied unauthorised access");
  }
  if(role==='ADMIN'){
    return await Job.getJobsByAdmin();
  }
  const jobs = await Job.getJobsByStatus(status);
  return jobs;
}
const getJobById=async(userId) =>{
  return Job.find({createdBy:userId});
}
const updateJobStatus = async (jobId, body) => {
  const { status, role } = body;
  console.log(role);
  if(role!='ADMIN'){
    throw new Error("access denied admin access required");
  }
  const jobObjectId = mongoose.Types.ObjectId(jobId);
  console.log(jobObjectId);
  try {
    const job = await Job.findOne( { _id: jobObjectId } );
    if (!job) throw new Error('Job not found');
    job.status = status;
    const updatedJob = await job.save();
    return updatedJob;
  } catch (err) {
    console.error(err);
    throw new Error('Error updating job status');
  }
}
module.exports={
  createJob,
  getJobs,
  getJobById,
  updateJobStatus
}