const { jobService } =require('../services/index');
const  catchAsync  = require('../utils/catchAsync');

const getJobs = catchAsync(async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jsonObject=await jobService.getJobs(page);
  res.send(jsonObject);
});
const getJobsCreatedById=catchAsync(async (req,res)=>{
  const page=parseInt(req.query.page);
  const user=req.cookies.userId;
  const jobs= await jobService.getJobsById(user,page);
  res.send(jobs);
});

const getRecomendedJobs=catchAsync(async (req,res)=>{
  const jobs=await jobService.getRecomendedJobs();
  res.send(jobs);
})
const getJobByJobId = catchAsync(async (req,res)=>{
  const jobId = req.params.id;
  const job=await jobService.getJobByJobId(jobId);
  res.send(job);
})

const search = catchAsync(async (req,res)=>{
  let { search } = req.query;
  search = JSON.parse(search);
  const jobs = await jobService.search(search);
  res.send(jobs);
})
module.exports={
  getJobs,
  getJobsCreatedById,
  getRecomendedJobs,
  getJobByJobId,
  search
}
