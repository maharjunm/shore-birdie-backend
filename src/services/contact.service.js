const config=require('../config/config');
const AWS=require('aws-sdk');
const { sendMail } = require('./email.service');

const send=async (reqBody)=>{
  const { fromemail, toemail} = config;
  const data = 'It is a query in your app shore-birdie from the mailId:\n '+
  reqBody.email +' \nfrom the company name registered as:\n '+
  reqBody.companyName + ' \nhave the following query:\n ' +'"'+
  reqBody.query+'"'
  const subject = 'Message from '+ reqBody.name;
  const status  =  await sendMail(fromemail,toemail,data,subject);
  return status;
}

module.exports={
  send
}
