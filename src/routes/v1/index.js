const express = require('express');
const paymentRoute = require('./payment.route');
const userRoute = require('./user.route');
const testRoute = require('./test.route');
const config = require('../../config/config');
const jobRoute=require('./job.route');
const contactRoute=require('./contact.route');
const adminRouter =require('./admin.router');
const productRouter =require('./product.router');
const utilsRouter =require('./utils.router');

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
    route: userRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path:'/admin',
    route: adminRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
  {
    path:'/utils',
    route: utilsRouter,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
