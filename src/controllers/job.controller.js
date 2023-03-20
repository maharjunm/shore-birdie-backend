const { jobService } =require('../services/index');
let Id='user';
const CreateJob= async (req,res)=>{
  const job=await jobService.createJob(req.body);
  job.updatedBy = Id;
  job.createdBy = Id;
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
