var express = require('express');
var router = express.Router();
var cherryCard = require('../static_json/cherry_card.json');

router.get('/:category', function (req, res, next) {
  var category = req.params.category;
  console.log(category);
  var cardList = cherryCard.filter(function (cherryCard) {
    return cherryCard.category === category;
  });
  res.send(cardList);
});

router.get('/:category/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10);
  var cherryCardDetail = cherryCard.find(function (cherryCard) {
    return cherryCard.id === id;
  });
  res.send(cherryCardDetail);
});

module.exports = router;