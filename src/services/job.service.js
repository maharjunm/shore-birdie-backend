const { PageDefaultLimit } = require('../config/config');
const { Job }=require('../models/index');
const mongoose=require('mongoose');

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
const getJobByJobId=async(jobId) =>{
  try{
    const jobObjectId = mongoose.Types.ObjectId(jobId);
    if(!jobObjectId) throw new Error('Job Not Found');
    const job = await Job.findOne({_id:jobObjectId});
    return job;
  } catch( error){
    throw new Error('Job Not Found');
  }
}

const search = async () => {
  const jobs = await Job.find();
  return jobs;
}


module.exports={
  createJob,
  getJobs,
  getJobsById,
  getRecomendedJobs,
  getJobByJobId,
  search,
}