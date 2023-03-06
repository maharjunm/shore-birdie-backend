const { contactService }=require('../services/index');

const SendMail=async (req,res)=>{
  const contact=await contactService.send(req.body);
  res.status(201).send(contact);
}

module.exports={
  SendMail
}