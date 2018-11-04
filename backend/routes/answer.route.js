var express = require('express');
var answerCtrl = require('../controllers/answer.controller');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/')
  // GET /api/answers - Get list of answer
  .get(answerCtrl.list)
  // POST /api/answers - Create answer
  .post(answerCtrl.create, function(req, res, next) {
    req.body.receiver = req.decoded.address;
    req.body.tokens = 12;
    next();
  }, contractCtrl.sendTokens);

router.route('/:answerId')
  // GET /api/users/:userId - Get user
  .get(answerCtrl.get)

// Load user when API with userId route parameter is hit
router.param('answerId', answerCtrl.load);

module.exports = router;