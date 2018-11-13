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
  .post(auth, 
    function(req, res, next) {
      req.tokens = 4, req.actionType = actionType.QUESTION, next();
    },
    validate({}), questionCtrl.create, 
    validate(paramValidation.sendTokensToSystem), contractCtrl.sendTokensToSystem, 
    validate(paramValidation.createEvent), eventCtrl.create,
    function(req, res) {
      res.json(req.savedQuestion);
    });

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