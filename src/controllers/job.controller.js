const { jobService } =require('../services/index');
const  catchAsync  = require('../utils/catchAsync');

const createJob = catchAsync(async (req,res)=>{
  const { userId, email} = req.cookies;
  const status=await jobService.createJob(req.body,userId,email);
  res.send(status);
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
const getRecomendedJobs = catchAsync(async (req,res)=>{
  const jobs= await jobService.getRecomendedJobs();
  res.send(jobs);
});
module.exports={
  createJob,
  getJobs,
  getJobCreatedById,
  getRecomendedJobs
}
