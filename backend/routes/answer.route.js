var express = require('express');
var validate = require('express-validation');
var answerCtrl = require('../controllers/answer.controller');
var contractCtrl = require('../controllers/contract.controller');
var eventCtrl = require('../controllers/event.controller');
var paramValidation = require('../config/param-validation');
var actionType = require('../helpers/Type').actionType;

const router = express.Router();

router.route('/')
  // GET /api/answers - Get list of answer
  .get(answerCtrl.list)
  // POST /api/answers - Create answer
  .post((req, res, next) => {
      req.actionType = actionType.ANSWER;
      req.from = req.decoded.system_id;
      req.to = req.decoded._id;
      req.tokens = 12;
      next();
    },
    validate(paramValidation.createAnswer), answerCtrl.create, 
    validate(paramValidation.sendTokens), contractCtrl.sendTokens, 
    validate(paramValidation.createEvent), eventCtrl.create,
    (req, res) => res.json(req.savedQuestion));

router.route('/:answerId')
  // GET /api/users/:userId - Get user
  .get(answerCtrl.get)

// Load user when API with userId route parameter is hit
router.param('answerId', answerCtrl.load);

module.exports = router;