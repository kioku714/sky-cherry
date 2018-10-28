var express = require('express');
var router = express.Router();
var newsRoutes = require('./news.route');
var questionRoutes = require('./question.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount news routes at /news
router.use('/news', newsRoutes);

// mount question routes at /questions
router.use('/questions', questionRoutes);

module.exports = router;
