const { PageDefaultLimit } = require('../config/config');
const { Job }=require('../models/index');
const mongoose=require('mongoose');

const createJob= async (jobBody,userId)=>{
  jobBody.createdBy = userId;
  jobBody.updatedBy = userId;
  const job=new Job(jobBody);
  job.createdAt = new Date();
  job.updatedAt = new Date();
  await job.save();
  return {
    "status":true,
    "message": "Successfully posted job",
    "jobId": job._id,
  };
}

const getJobs=async (page)=>{
  const jobs= await Job.find({'status':'Approved',paymentStatus:true}).skip(page).limit(parseInt(PageDefaultLimit));
  return jobs;
}
const getJobsById=async(user,page) =>{
  return Job.find({createdBy:user}).limit(parseInt(PageDefaultLimit)).skip(page);
}
const getRecomendedJobs=async() =>{
  return Job.find({
    $and:[
    { status:'Approved'},
    {paymentStatus:true},
    { $or :[
      { productType: 'Diamond'},
      {productType: 'Platinum'}
    ]}
   ]});
}
const getJobByJobId=async(jobId) =>{
  try{
    const jobObjectId = mongoose.Types.ObjectId(jobId);
    if(!jobObjectId) throw new Error('Job Not Found');
    const job = await Job.findOne({_id:jobObjectId});
    return job;
  } catch( error){
    throw new Error('Job Not Found');
  }
}
const getDiciplines = ()=>{
  const dis = ['Life Sciences', 'Physics', 'Biomedicine','Health Sciences','Engineering','Chemistry','Computer Science','Applied Science','Nanotechnology','Earth Sciences','Environmental','Sciences','Veterinary','Fisheries','Agriculture','Forestry'];
  return dis;
}
const getSectors = () => {
  const sectors = ['Academia','Industry','Government','Healthcare/Hospital','Non-Profit','Media/Communications'];
  return sectors;
}
const getRegions = () => {
  const regions = ['North America','Europe','Asia','South America','Asia Pacific','Australia','Middle East','Oceania','Working from home'];
  return regions;
}
const search = async (search) => {
  const dis = search.discipline.length==0? getDiciplines():search.discipline;
  const sectors = search.sector.length==0? getSectors() :search.sector;
  const regions = search.country.length==0? getRegions():search.country ;
  const atleastSalary = search.salary?search.salary:0; 

  const jobs = await Job.aggregate([
    {
      "$match":{
        discipline:{
          $in : [...dis]
        },
        "company.companyType":{
          $in: [...sectors]
        },
        "location.region":{
          $in: [...regions]
        },
        $and:[
          {"job.title":{
            $regex :search.jobTitle?search.jobTitle:"" , $options:"i"
          }},
          {"location.city":{
            $regex :search.location?search.location:"" , $options:"i"
          }},
          {"salary.sal":{
            $gt: atleastSalary
          }},
        ],
      }
    },
  ]).sort({'dates.postingDate':-1});
  return jobs;
}


module.exports={
  createJob,
  getJobs,
  getJobsById,
  getRecomendedJobs,
  getJobByJobId,
  search,
}