const express = require('express');
const paymentRoute = require('./payment.route');
const userRoute = require('./user.route');
const testRoute = require('./test.route');
const config = require('../../config/config');
const jobRoute=require('./job.route');
const contactRoute=require('./contact.route');
const userRouter = require('./userRouter');
const adminRouter =require('./admin.router');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/job',
    route: jobRoute,
  },
  {
    path:'/checkout',
    route: paymentRoute,
  },
  {
    path: '/test',
    route: testRoute
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path:'/admin',
    route: adminRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
