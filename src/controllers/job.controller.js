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
  const page = parseInt(req.query.page) || 0;
  const jobTitle = req.query.title || "";
  let country = req.query.country || "All";
  let discipline = req.query.discipline || "All";
  let sector = req.query.sector || "All";
  const salary = parseInt(req.query.salary) || 0;
  const sort = 'dates.postingDate';
  const jobs = jobService.search();
  res.send(jobs);
})
module.exports={
  getJobs,
  getJobsCreatedById,
  getRecomendedJobs,
  getJobByJobId,
  search
}
