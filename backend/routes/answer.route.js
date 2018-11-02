var express = require('express');
var answerCtrl = require('../controllers/answer.controller');

const router = express.Router();

router.route('/')
  // POST /api/answers - Create new answer
  .post(answerCtrl.create);

module.exports = router;