const { Job }=require('../models/index');

const createJob= async (jobBody)=>{
  const job=new Job(jobBody);
  await job.save()
  return job;
}
const getJob=async ()=>{
  return Job.find();
}

module.exports={
  createJob,
  getJob
}