var express = require('express');
var router = express.Router();
var newsJson = require('../static_json/news.json');

router.get('/:category', function (req, res, next) {
  var category = req.params.category;
  var newsList = newsJson.filter(function (news) {
    return news.category === category;
  });
  res.send(newsList);
});

router.get('/:category/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10);
  var news = newsJson.find(function (news) {
    return news.id === id;
  });
  res.send(news);
});

module.exports = router;