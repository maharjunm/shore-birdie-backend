const { Contact }=require('../models/index');

const createContact=async (reqBody)=>{
  const contact=new Contact(reqBody);
  contact.save();
  return contact;
}
module.export={
  createContact
}