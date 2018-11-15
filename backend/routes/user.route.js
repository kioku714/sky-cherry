var express = require('express');
var validate = require('express-validation');
var userCtrl = require('../controllers/user.controller');
var contractCtrl = require('../controllers/contract.controller');
var eventCtrl = require('../controllers/event.controller');
var paramValidation = require('../config/param-validation');
var actionType = require('../helpers/Type').actionType;

const router = express.Router();

router.route('/')
  // GET /api/users - Get list of user
  .get(userCtrl.list)

router.route('/:userId')
  // GET /api/users/:userId - Get user
  .get(userCtrl.get)
  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update, function(req, res, next) {
    req.actionType = actionType.PORFILE
    req.from = req.decoded.system_id;
    req.to = req.decoded._id
    req.tokens = 10;
    next();
  }, 
  validate(paramValidation.sendTokens), contractCtrl.sendTokens, 
  validate(paramValidation.createEvent), eventCtrl.create,
  (req, res) => res.json(req.savedUser));
  
router.route('/:userId/tokens')
  // GET /api/users/:userId/tokens - Get user tokens
  .get(contractCtrl.getUserTokens)

router.route('/:userId/coins')
  // GET /api/users/:userId/coins - Get user coins
  .get(contractCtrl.getUserCoins)  

  // Load user when API with userId route parameter is hit
router.param('userId', userCtrl.load);

module.exports = router;