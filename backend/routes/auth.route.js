var express = require('express');
var authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/login')
  /** POST /api/auth/login - Returns token if correct username and password is provided */
  .post(authCtrl.login);

module.exports = router;