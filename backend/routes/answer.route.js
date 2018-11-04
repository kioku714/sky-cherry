var express = require('express');
var answerCtrl = require('../controllers/answer.controller');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/')
  // PUT /api/answers - Create answer
  .post(answerCtrl.create, function(req, res, next) {
    req.body.receiver = req.decoded.address;
    req.body.tokens = 12;
    next();
  }, contractCtrl.sendTokens);

  module.exports = router;