const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const user = req.cookies.userId;
  const job=await jobService.createJob(req.body,user);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const jsonObject=await jobService.getJob();
  const Id = req.cookies.user;
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
