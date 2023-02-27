const express = require('express');
const { contactController }= require('../../controllers/index');

const router = express.Router();

router.route('/').post(contactController.SendMail);

module.exports = router;