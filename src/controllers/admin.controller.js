const express =require('express');
const mongoose=require('mongoose');
const { adminServices }=require('../services/index');

const GetJobs=async (req,res)=>{
  const jobs= await adminServices.getJob(req.body);
  console.log(jobs);
  res.send(jobs);
}
const updateStatus=async (req,res)=>{
  const jobId =req.params.id;
  const status = req.body.status;

  try {
    const updatedJob = await adminServices.updateJobStatus(jobId, status);
    res.json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}


module.exports={
  GetJobs,
  updateStatus
}