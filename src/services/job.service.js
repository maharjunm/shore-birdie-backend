const { Job, Payment,User } = require('../models/index');
const userModel = require('../models/userModel');

const createJob= async (jobBody,userId,email)=>{
  const payment = await  Payment.getPaymentStatus(email);
  if((!payment || !payment.status) && !userModel.isAdmin ) throw Error('Payment not yet done');
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
const getJobs=async ()=>{
  return Job.find();
}
const getJobById=async(userId) =>{
  return Job.find({createdBy:userId});
}
const getRecomendedJobs= async()=>{
  const diamondAndPlatinumPayments = await Payment.find({
    'status': true,
    'product.type': {$in: ['Diamond', 'Platinum']}
  }).distinct('email');
  
  const createdByUserIds = await userModel.find({
    'email': {$in: diamondAndPlatinumPayments}
  }).distinct('userId');
  
  const jobs = await Job.find({
    'createdBy': {$in: createdByUserIds},
    'status': 'Approved'
  });
  return jobs;
  
}

module.exports={
  createJob,
  getJobs,
  getJobById,
  getRecomendedJobs
}