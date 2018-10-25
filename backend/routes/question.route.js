var express = require('express');
var questionCtrl = require('../controllers/question.controller');

const router = express.Router();

router.route('/')
  // GET /api/question - Get list of question
  .get(questionCtrl.list)
  // POST /api/question - Create new question
  .post(questionCtrl.create);

router.route('/:questionId')
  // GET /api/question/:questionId - Get question
  .get(questionCtrl.get);

// Load question when API with questionId route parameter is hit
router.param('questionId', questionCtrl.load);

module.exports = router;