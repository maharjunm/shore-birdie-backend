const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const user = req.cookies.userId;
  const job=await jobService.createJob(req.body,user);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const skip= req.query.skip? parseInt(req.query.skip) : 0;
  const jsonObject=await jobService.getJob(skip);
  res.send(jsonObject);
}
const getJobCreatedByUser=async (req,res)=>{
  const jobs= await jobService.getJobByUser(req.cookies.email);
  res.send(jobs);
}
module.exports={
  CreateJob,
  GetJob,
  getJobCreatedByUser
}
