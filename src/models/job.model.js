const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobSchema = new Schema({
  job: {
    title: { type: String, required: true },
    experience: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
    qualification: { type: String, required: true },
  },
  company: {
    name: { type: String, required: true },
    companyType: { type: String, required: true },
    logo: { type : String , required: true},
  },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    region: { type: String, required: true },
  },
  dates: {
    postingDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    closingDate: { type: Date, required: true },
    removingDate: { type: Date, required: true },
  },
  salary: {
    sal: { type: Number, required: true },
    hours: { type: Number, required: true },
    companyType: { type: String, enum: ['Annual', 'Regular', 'Monthly', 'Quarterly'], required: true },
  },
  qualifications:[{
    value:String,
    id:String,
  }],
  discipline:[String],
  duties:[{
    value:String,
    id:String,
  }],
  contact:{
    email:String,
    employeeEmail:String,
  },
  discipline: {
    type: [String],
    required: true
  },
  createdBy:[{type:String}],
  updatedBy:[{type:String}],
  createdAt:[{type:Date}],
  updatedAt:[{type:Date}],
  status:{
    type:String,
    enum: ['Approved','Rejected','Pending'],
  },
  createdBy:String
  
});


const Job = mongoose.model('job', jobSchema);

module.exports = Job;
