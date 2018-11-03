var express = require('express');
var likeCtrl = require('../controllers/like.controller');

const router = express.Router();

router.route('/')
  // POST /api/like - Create new like
  .post(likeCtrl.create);

module.exports = router;