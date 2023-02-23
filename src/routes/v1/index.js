const express = require('express');
const userRoute = require('./user.route');
const config = require('../../config/config');
const jobRoute=require('./job.route');
const testRoute=require('./test.route');
const userRouter = require('./userRouter');
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
    path: '/test',
    route: testRoute
  },
  {
    path: '/user',
    route: userRouter,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
