var express = require('express');
var validate = require('express-validation');
var questionCtrl = require('../controllers/question.controller');
var answerCtrl = require('../controllers/answer.controller');
var contractCtrl = require('../controllers/contract.controller');
var eventCtrl = require('../controllers/event.controller');
var expressJwt = require('express-jwt');
var paramValidation = require('../config/param-validation');
var config = require('../config/config');
var actionType = require('../helpers/Type').actionType;

const router = express.Router();
const auth = expressJwt({secret: config.jwtSecret, requestProperty: 'decoded'})

router.route('/')
  // GET /api/questions - Get list of question
  .get(questionCtrl.list)
  // POST /api/questions - Create new question
  .post((req, res, next) => {
      req.actionType = actionType.QUESTION;
      req.from = req.decoded._id;
      req.to = req.decoded.system_id;
      req.tokens = 4;
      next();
    },
    validate(paramValidation.createQuestion), questionCtrl.create, 
    validate(paramValidation.sendTokens), contractCtrl.sendTokens, 
    validate(paramValidation.createEvent), eventCtrl.create,
    (req, res) => res.json(req.savedQuestion));

router.route('/:questionId')
  // GET /api/questions/:questionId - Get question
  .get(questionCtrl.get);

router.route('/:questionId/answers')
  // GET /api/questions/:questionId - Get question
  .get(function(req, res, next) {
    req.query.question = req.question._id;
    next();
  }, answerCtrl.list);

// Load question when API with questionId route parameter is hit
router.param('questionId', questionCtrl.load);

module.exports = router;