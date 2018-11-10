var express = require('express');
var questionCtrl = require('../controllers/notification.controller');

const router = express.Router();

router.route('/')
  // GET /api/notifications - Get list of notification
  .get(questionCtrl.list)

module.exports = router;