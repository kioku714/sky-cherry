var express = require('express');
var questionCtrl = require('../controllers/question.controller');

const router = express.Router();

router.route('/')
  // GET /api/questions - Get list of question
  .get(questionCtrl.list)
  // POST /api/questions - Create new question
  .post(questionCtrl.create);

router.route('/:questionId')
  // GET /api/questions/:questionId - Get question
  .get(questionCtrl.get);

// Load question when API with questionId route parameter is hit
router.param('questionId', questionCtrl.load);

module.exports = router;