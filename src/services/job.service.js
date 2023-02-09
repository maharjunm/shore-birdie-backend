const { Job }=require('../models/index');

const createJob= async (jobBody)=>{
  const job=new Job(jobBody);
  await job.save()
  return job;
}

module.exports={
  createJob
}