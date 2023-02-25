const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ContactSchema=new Schema({
  email: String,
  companyName: String,
  name: String,
  query: String
});

const Contact=mongoose.model('contact',ContactSchema);

module.exports = Contact;