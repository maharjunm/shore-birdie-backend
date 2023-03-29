const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const cookieParser = require('cookie-parser');

const app = express();
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
const corsOptions ={
  origin:[config.frontendUrl,], 
  credentials:true,            
  optionSuccessStatus:200,
  allowedHeaders: ['Content-Type','Authorization','x-csrf-token'],
}
app.use(cors(corsOptions));
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/v1', routes);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);


module.exports = app;
