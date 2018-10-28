var express = require('express');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var authRoutes = require('./auth.route');
var newsRoutes = require('./news.route');
var questionRoutes = require('./question.route');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount news routes at /news
router.use('/news', newsRoutes);

// mount question routes at /questions
router.use('/questions', questionRoutes);

module.exports = router;
