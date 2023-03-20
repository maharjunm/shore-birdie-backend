const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const job=await jobService.createJob(req.body);
  const user = req.cookies.userName;
  job.updatedBy = user;
  job.createdBy = user;
  await job.save();
  res.send(job);
}

const GetJob=async (req,res)=>{
  const jsonObject=await jobService.getJob();
  Id = req.cookies.user;
  res.send(jsonObject);
}
module.exports={
  CreateJob,
  GetJob
}
