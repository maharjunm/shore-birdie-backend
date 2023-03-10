const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const job=await jobService.createJob(req.body);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const jsonObject=await jobService.getJob();
  res.send(jsonObject);
}
module.exports={
  CreateJob,
  GetJob
}
