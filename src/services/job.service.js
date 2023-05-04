const { PageDefaultLimit } = require('../config/config');
const { Job }=require('../models/index');

const createJob= async (jobBody,userId)=>{
  jobBody.createdBy = userId;
  jobBody.updatedBy = userId;
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  await job.save();
  return {
    "status":true,
    "message": "Successfully posted job",
  };
}

const getJobs=async (page)=>{
  const jobs= await Job.find({'status':'Approved'}).skip(page).limit(parseInt(PageDefaultLimit));
  return jobs;
}
const getJobsById=async(user,page) =>{
  return Job.find({createdBy:user}).limit(parseInt(PageDefaultLimit)).skip(page);
}
const getRecomendedJobs=async() =>{
  return Job.find({
    $and:[
    { status:'Approved'},
    { $or :[
      { productType: 'Diamond'},
      {productType: 'Platinum'}
    ]}
   ]});
}

module.exports={
  createJob,
  getJobs,
  getJobsById,
  getRecomendedJobs
}