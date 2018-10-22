var express = require('express');
var questionRoutes = require('./question.route');

const router = express.Router(); // eslint-disable-line new-cap

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount question routes at /question
router.use('/question', questionRoutes);

module.exports = router;