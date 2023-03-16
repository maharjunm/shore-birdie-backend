const { jobService } =require('../services/index');

const CreateJob= async (req,res)=>{
  const job=await jobService.createJob(req.body);
  res.send(job);
}

const GetJob=async (req,res)=>{
  const jsonObject=await jobService.getJob();
  res.send(jsonObject);
}
const GetJobById=async (req,res)=>{
  const Id=req.params.user;
  const jobs= await jobService.getJobById(Id);
  res.send(jobs);

}
module.exports={
  CreateJob,
  GetJob,
  GetJobById
}
