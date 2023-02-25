const { contactService }=require('../services/index');

const CreateContact=async (req,res)=>{
  const contact=await contactService.createContact(req.body);
  res.status(201).send(contact);
}

module.exports={
  CreateContact
}