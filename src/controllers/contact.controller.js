const {Contact} =require('../models/index');

const CreateContact=async (req,res)=>{
  const contact=await contactServices.createContact(req.body);
  res.send(contact);
}

module.export={
  CreateContact
}