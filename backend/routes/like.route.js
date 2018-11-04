var express = require('express');
var likeCtrl = require('../controllers/like.controller');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/')
  // GET /api/likes - Get list of like
  .get(likeCtrl.list)
  // POST /api/likes - Create like
  .post(likeCtrl.create, contractCtrl.sendMultipleTokens);

router.route('/:likeId')
  // GET /api/users/:userId - Get user
  .get(likeCtrl.get)

// Load user when API with userId route parameter is hit
router.param('likeId', likeCtrl.load);

module.exports = router;