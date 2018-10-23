var express = require('express');
var router = express.Router();
var cherryCardRoutes = require('./cherryCard.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount question routes at /question
router.use('/cherryCard', cherryCardRoutes);

module.exports = router;
