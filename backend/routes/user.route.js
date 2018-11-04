var express = require('express');
var userCtrl = require('../controllers/user.controller');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/')
  // GET /api/users - Get list of user
  .get(userCtrl.list)

router.route('/:userId')
  // GET /api/users/:userId - Get user
  .get(userCtrl.get)
  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update, function(req, res, next) {
    req.body.receiver = req.user.keyStore.address;
    req.body.tokens = 10;
    next();
  }, contractCtrl.sendTokens);
  
  router.route('/:userId/tokens')
  // GET /api/users/:userId/tokens - Get user tokens
  .get((req, res, next) => contractCtrl.load(req, res, next), contractCtrl.getUserTokens)

// Load user when API with userId route parameter is hit
router.param('userId', userCtrl.load);

module.exports = router;