const { Contact }=require('../models/index');

const createContact=async (reqBody)=>{
  const contact=new Contact(reqBody);
  await contact.save();
  return contact;
}
module.exports={
  createContact
}