const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const user = req.cookies.userId;
  const job=await jobService.createJob(req.body,user);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jsonObject=await jobService.getJob(page);
  res.send(jsonObject);
}
const getJobCreatedByUser=async (req,res)=>{
  const userId=req.cookies.email;
  const jobs= await jobService.getJobByUser(userId);
  res.send(jobs);
}
module.exports={
  CreateJob,
  GetJob,
  getJobCreatedByUser
}
