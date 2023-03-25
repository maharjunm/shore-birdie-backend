const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const user = req.cookies.user;
  if (loggedIn === 'true'){ console.log('pranav')}
  const job=await jobService.createJob(req.body,user);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const jsonObject=await jobService.getJob();
  res.send(jsonObject);
}
const getJobCreatedById=async (req,res)=>{
  const userId=req.params.user;
  const jobs= await jobService.getJobById(userId);
  res.send(jobs);
}
module.exports={
  CreateJob,
  GetJob,
  getJobCreatedById
}
