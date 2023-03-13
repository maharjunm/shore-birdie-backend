const Joi = require('joi');

const JobValidate = {
  body: Joi.object().keys(
    {
      job :{
        title: Joi.string().required(),
        experience: Joi.string().required(),
        type: Joi.string().required(),
        qualification: Joi.string().required(),

        company: {
          name: Joi.string().required(),
          companyType: Joi.string().required(),
          logo: Joi.string().required(),
        },
        location: {
          city: Joi.string().required(),
          country: Joi.string().required(),
          state: Joi.string().required(),
          region: Joi.string().required(),
        },
        dates: {
          postingDate: Joi.string().required(),
          expiryDate: Joi.string().required(),
          closingDate: Joi.string().required(),
          removingDate: Joi.string().required(),
        },
        salary: {
          sal: Joi.number().required(),
          hours: Joi.number().required(),
          companyType: Joi.string().required(),
        },
      }
    }
  )
}

module.exports =  JobValidate;