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
const getJobCreatedById=async (req,res)=>{
  const page=req.query.page;
  const user=req.cookies.userId;
  const jobs= await jobService.getJobById(user,page);
  res.send(jobs);
}
module.exports={
  CreateJob,
  GetJob,
  getJobCreatedById
}
