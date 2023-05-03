const httpStatus = require('http-status');
const { adminServices }=require('../services/index');
const catchAsync = require('../utils/catchAsync');

const getJobs=async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jobs= await adminServices.getJobs(page,'Pending');
  res.send(jobs);
}
const getRejectedJobs=async (req,res)=>{
  const page= req.query.page? parseInt(req.query.page) : 0;
  const jobs= await adminServices.getJobs(page,'Rejected');
  res.send(jobs);
}
const updateStatus=async (req,res)=>{
  const jobId =req.params.id;
  const status = req.body.status;

  try {
    const updatedJob = await adminServices.updateJobStatus(jobId, status);
    res.json(updatedJob);
  } catch (err) {
    res.status(500).send('Server error');
  }
}
const approveJob = catchAsync(async (req,res)=>{
  const jobId =req.params.id;
  const { email } =req.cookies;
  const status = await adminServices.setJobStatus(jobId,'Approved',email);
  res.status(httpStatus.CREATED).send(status);
})
const rejectJob  = catchAsync( async (req,res)=> {
  const jobId =req.params.id;
  const { email } =req.cookies;
  const status = await adminServices.setJobStatus(jobId,'Rejected',email);
  res.status(httpStatus.CREATED).send(status);
})


module.exports={
  getJobs,
  updateStatus,
  approveJob,
  rejectJob,
  getRejectedJobs,
}