var express = require('express');
var questionCtrl = require('../controllers/question.controller');
var movies = require('../test.json');

const router = express.Router();

router.route('/')
  // GET /api/question - Get list of question
  .get(questionCtrl.list)
  // POST /api/question - Create new question
  .post(questionCtrl.create);

  module.exports = router;