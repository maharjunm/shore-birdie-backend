const { jobService } =require('../services/index');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const createJob = catchAsync(async (req,res)=>{
  const { email } = req.query;
  console.log(email);
  const job=await jobService.createJob(req.body,email);
  res.send(job);
})

const getJobs = catchAsync(async (req,res)=>{
  const jsonObject=await jobService.getJobs(req.query);
  res.send(jsonObject);
})
const getJobCreatedById = catchAsync(async (req,res)=>{
  const userId=req.params.user;
  console.log("jobs by id",userId);
  const jobs= await jobService.getJobById(userId);
  res.send(jobs);
})
const updateJobStatus = catchAsync(async (req,res) => {
  const jobId = req.params.id;
  const updatedJob = await jobService.updateJobStatus(jobId, req.body);
  res.json(updatedJob);
})

module.exports={
  createJob,
  getJobs,
  getJobCreatedById,
  updateJobStatus
}

