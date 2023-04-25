const express =require('express');
const mongoose=require('mongoose');
const { adminServices }=require('../services/index');

const getJobs=async (req,res)=>{
  const page= req.query.page ? parseInt(req.query.page) : 0;
  const jobs= await adminServices.getJobs(page);
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


module.exports={
  getJobs,
  updateStatus
}