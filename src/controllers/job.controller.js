const { jobService } =require('../services/index');
const  catchAsync  = require('../utils/catchAsync');

const getJobs = catchAsync(async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jsonObject=await jobService.getJobs(page);
  res.send(jsonObject);
});
const getJobsCreatedById=(async (req,res)=>{
  const page=parseInt(req.query.page);
  const user=req.cookies.userId;
  const jobs= await jobService.getJobsById(user,page);
  res.send(jobs);
});
module.exports={
  getJobs,
  getJobsCreatedById
}
