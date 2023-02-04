const express = require('express');
const paymentRoute = require('./payment.route');
const userRoute = require('./user.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path:'/payments',
    route: paymentRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
