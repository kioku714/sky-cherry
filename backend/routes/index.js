var express = require('express');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var authRoutes = require('./auth.route');
var newsRoutes = require('./news.route');
var questionRoutes = require('./question.route');
var contractRoutes = require('./contract.route');
var userRoutes = require('./user.route');
var answerRoutes = require('./answer.route');
var likeRoutes = require('./like.route');
var notificationRoutes = require('./notification.route');
var eventRoutes = require('./event.route');

const router = express.Router(); // eslint-disable-line new-cap
const auth = expressJwt({secret: config.jwtSecret, requestProperty: 'decoded'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount news routes at /news
router.use('/news', newsRoutes);

// mount question routes at /questions
router.use('/questions', auth, questionRoutes);

// mount contract routes at /contracts
router.use('/contracts', auth, contractRoutes);

// mount user routes at /users
router.use('/users', auth, userRoutes);

// mount answer routes at /answers
router.use('/answers', auth, answerRoutes);

// mount like routes at /likes
router.use('/likes', auth, likeRoutes);

// mount notification routes at /notifications
router.use('/notifications', auth, notificationRoutes);

// mount event routes at /notifications
router.use('/events', auth, eventRoutes);

module.exports = router;
