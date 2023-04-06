const { jobService } =require('../services/index');
const  catchAsync  = require('../utils/catchAsync');

const createJob = catchAsync(async (req,res)=>{
  const user = req.cookies.userId;
  const job=await jobService.createJob(req.body,user);
  res.send(job);
});

const getJobs = catchAsync( async (req,res)=>{
  const jsonObject=await jobService.getJobs();
  res.send(jsonObject);
});
const getJobCreatedById = catchAsync( async (req,res)=>{
  const userId=req.cookies.userId;
  const jobs= await jobService.getJobById(userId);
  res.send(jobs);
});
module.exports={
  createJob,
  getJobs,
  getJobCreatedById
}
