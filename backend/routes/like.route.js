var express = require('express');
var likeCtrl = require('../controllers/like.controller');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/')
  // PUT /api/likes - Create like
  .post(likeCtrl.create, contractCtrl.sendMultipleTokens);

  module.exports = router;