const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test') ,
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    STRIPE_SECRET_KEY: Joi.string().required().description('Stripe Private key'),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    FROM_EMAIL: Joi.string().required(),
    TO_EMAIL: Joi.string().required(),
    AUTH_SECRET_KEY: Joi.string().required().description('auth secret key'),
    PAYMENT_EXPIRY_DAYS: Joi.number().default(30).description("user payment expiry days"),
    TOKEN_EXPIRY_DAYS: Joi.number().default(2).description('user login token expiry days')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  stripekey: envVars.STRIPE_SECRET_KEY,
  accesskey: envVars.AWS_ACCESS_KEY,
  secretKey: envVars.AWS_SECRET_ACCESS_KEY,
  region: envVars.AWS_REGION,
  fromemail: envVars.FROM_EMAIL,
  toemail: envVars.TO_EMAIL,
  auth: envVars.AUTH_SECRET_KEY,
  paymentExpiryDays: envVars.PAYMENT_EXPIRY_DAYS,
  tokenExpiryDays: envVars.TOKEN_EXPIRY_DAYS,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
