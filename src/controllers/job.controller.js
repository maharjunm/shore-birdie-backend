const { jobService } =require('../services/index');
const { Job }=require('../models/index');

const CreateJob= async (req,res)=>{
  const job=await jobService.createJob(req.body);
  res.status(201).send(job);

}

module.exports={
  CreateJob
}
