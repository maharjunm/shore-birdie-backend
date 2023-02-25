const express = require('express');
const paymentRoute = require('./payment.route');
const userRoute = require('./user.route');
const testRoute = require('./test.route');
const config = require('../../config/config');
const jobRoute=require('./job.route');
const contactRoute=require('./contact.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/job',
    route: jobRoute
  },
  {
    path:'/contact',
    route: contactRoute 
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
