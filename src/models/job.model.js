const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  job: {
    title: String,
    qualifications: [String],
    duties: [String],
    experience: String,
    description: String,
    discipline: String,
    type:{
      type:String,
      enum:['full-time','part-time','contract','internship']
    },
    category: String,
  },
  company: {
    name: String,
    companyType: String,
    logo: String,
  },
  location: {
    city: String,
    country: String,
    region: String,
  },
  dates: {
    postingDate: Date,
    expiryDate: Date,
    closingDate: Date,
    removingJobDate: Date,
  },
  salary: {
    sal: Number,
    hours: Number,
    companyType: String,
  },
  
});
const Job = mongoose.model('job', jobSchema);
module.exports = Job;
