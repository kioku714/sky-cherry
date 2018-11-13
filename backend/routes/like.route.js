var express = require('express');
var validate = require('express-validation');
var likeCtrl = require('../controllers/like.controller');
var contractCtrl = require('../controllers/contract.controller');
var eventCtrl = require('../controllers/event.controller');
var paramValidation = require('../config/param-validation');
var actionType = require('../helpers/Type').actionType;

const router = express.Router();

router.route('/')
  // GET /api/likes - Get list of like
  .get(likeCtrl.list)
  // POST /api/likes - Create like
  .post(
    validate(paramValidation.createLike), likeCtrl.create,
    (req, res, next) => {
      // 좋아요를 클릭한 사람 + 1
      if(req.savedLike.questionOrAnswerModel == 'Question') {
        req.actionType = actionType.LIKE_QUESTION;
      } else {
        req.actionType = actionType.LIKE_ANSWER;
      }
      req.from = req.decoded.system_id;
      req.to = req.decoded._id;
      req.tokens = 1;
      next();
    },
    validate(paramValidation.sendTokens), contractCtrl.sendTokens, 
    validate(paramValidation.createEvent), eventCtrl.create,
    (req, res, next) => {
      // 좋아요를 받은 사람 +2
      if(req.savedLike.questionOrAnswerModel == 'Question') {
        req.actionType = actionType.LIKE_ANSWER;
      } else {
        req.actionType = actionType.LIKE_MY_ANSWER;
      }
      req.actionType = actionType.LIKE_MY_ANSWER;
      req.from = req.decoded.system_id;
      req.to = req.body.reqReceiveUser._id;
      req.tokens = 2;
      next();
    },
    validate(paramValidation.sendTokens), contractCtrl.sendTokens, 
    validate(paramValidation.createEvent), eventCtrl.create,
    (req, res) => res.json(req.savedQuestion));

router.route('/:likeId')
  // GET /api/users/:userId - Get user
  .get(likeCtrl.get)

// Load user when API with userId route parameter is hit
router.param('likeId', likeCtrl.load);

module.exports = router;