const mongoose = require('mongoose');


const JobSchema=mongoose.Schema(
  {
    jobTitle: {
      type:String,
      required:true
    },
    companyName: {
      type:String,
      required:true
    },
    companyLogo: String,
    adress: {
      city: String,
      country: String,
      region: String
    },
    qualification:String,
    jobDescription: String,
    organizationType: String,
    salary: {
      type:Number,
      required:true
    },
    postingDate: Date,
    expiryDate: Date,
    applicationClosingDate: Date,
    applicationRemovalDate: Date,
    duration: {
      type:String,
      enum:['fixed','permanent']
    },
    discipline: String,
    organization: String,
    jobType: { 
      type: String, 
      enum: ['full-time', 'part-time', 'contract', 'internship'] 
    },
    category: { type: String},
    contactEmail:{
      type: String,
      required:true,
      lowercase:true
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
}

);


const Job=new mongoose.model('Job',JobSchema);

module.exports = Job;
