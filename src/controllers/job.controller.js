const { jobService } =require('../services/index');
const  catchAsync  = require('../utils/catchAsync');

const getJobs = catchAsync(async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jsonObject=await jobService.getJobs(page);
  res.send(jsonObject);
});
const getJobsCreatedById = catchAsync( async (req,res)=>{
  const userId=req.cookies.userId;
  const jobs= await jobService.getJobsById(userId);
  res.send(jobs);
});
module.exports={
  getJobs,
  getJobsCreatedById
}
