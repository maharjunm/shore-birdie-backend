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
const userRouter = require('./routes/userRouter');

const app = express();
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors());
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/v1', routes);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);


//user-auth
app.use('/user',userRouter);

module.exports = app;
