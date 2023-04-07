const { Job, Payment } = require('../models/index');

const createJob= async (jobBody,user)=>{
  const payment = await  Payment.getPaymentStatus();
  if(!payment.status) throw Error('Payment not yet done');
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  job.createdBy = user;
  job.updatedBy = user;
  await job.save();
  return {
    "status":true,
    "message": "Successfully posted job",
  };
}
const getJobs=async ()=>{
  return Job.find();
}
const getJobById=async(userId) =>{
  return Job.find({createdBy:userId});
}

module.exports={
  createJob,
  getJobs,
  getJobById
}