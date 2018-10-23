var express = require('express');
var router = express.Router();
var newsRoutes = require('./news.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount question routes at /question
router.use('/news', newsRoutes);

module.exports = router;
