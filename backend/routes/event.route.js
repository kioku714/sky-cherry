var express = require('express');
var eventCtrl = require('../controllers/event.controller');

const router = express.Router();

router.route('/')
  // GET /api/events - Get event of notification
  .get(eventCtrl.list)

module.exports = router;