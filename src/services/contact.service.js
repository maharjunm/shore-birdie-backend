const nodemailer=require('nodemailer');
const config=require('../config/config');
const AWS=require('aws-sdk');

const send=async (reqBody)=>{
  AWS.config.update({
    accessKeyId: config.accesskey,
    secretAccessKey: config.secretKey,
    region: config.region
  });
  const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: "2010-12-01",
  }),
  });

  var mailOptions = {
    from: config.fromemail,
    to: config.toemail,
    subject: 'A query from '+reqBody.name,
    text: 'It is a query in your app shore-birdie from the mailId:\n ' +reqBody.email +' \nfrom the company name registered as:\n '+ reqBody.companyName + ' \nhave the following query:\n ' +'"'+reqBody.query+'"'
  };

  transporter.sendMail(mailOptions,(error,info)=>{
     if (error) {
      console.log(error);
    }else {
      console.log('Email sent: ' + info.response);
    }
    return info.response;
  });

}

module.exports={
  send
}