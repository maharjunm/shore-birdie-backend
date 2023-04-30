const config=require('../config/config');
const AWS=require('aws-sdk');

const sendMail = async (fromMail,toMail,data,subject) => {
  const ses= new AWS.SES({
    accessKeyId: config.accesskey,
    secretAccessKey: config.secretKey,
    region: config.region
  });
  const params = {
    Destination: {
      ToAddresses: [toMail]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Text: {
          Data:data
        }
      }
    },
    Source: fromMail
  };
  try{
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  }catch(err){
    return {
      "message":"failed to send email"
    }
  }
};

module.exports={
  sendMail
}
