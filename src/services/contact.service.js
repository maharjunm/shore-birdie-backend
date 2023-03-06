const config=require('../config/config');
const AWS=require('aws-sdk');

const send=async (reqBody)=>{
  const ses= new AWS.SES({
    accessKeyId: config.accesskey,
    secretAccessKey: config.secretKey,
    region: config.region
  });

  const sendEmail = async () => {
    const params = {
        Destination: {
            ToAddresses: [config.toemail]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'It is a query in your app shore-birdie from the mailId:\n ' +reqBody.email +' \nfrom the company name registered as:\n '+ reqBody.companyName + ' \nhave the following query:\n ' +'"'+reqBody.query+'"'
                }
            },
            Subject: {
                Data: 'Message from '+reqBody.name
            }
        },
        Source: config.fromemail
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(result.MessageId);
    } 
    catch (err) {
        console.log(err);
    }
  };
  sendEmail();
}

module.exports={
  send
}
