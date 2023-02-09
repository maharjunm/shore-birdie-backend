const { jobService } =require('../services/index');
const { Job }=require('../models/index');

const CreateJob= async (req,res)=>{
 /* const job=new Job(req.body);
  job.save().then(res=>{
    console.log("successfully added");

  }).catch(err=>{
    console.log(err)});*/
  const job=await jobService.createJob(req.body);
  res.status(201).send(job);

}

module.exports={
  CreateJob
}