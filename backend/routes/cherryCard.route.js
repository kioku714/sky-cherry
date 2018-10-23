var express = require('express');
var router = express.Router();
var cherryCard = require('../static_json/cherry_card.json');

router.get('/', function (req, res, next) {
  res.send(cherryCard)
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10)
  var cherryCardDetail = cherryCard.filter(function (cherryCard) {
    return cherryCard.id === id
  });
  res.send(cherryCardDetail)
});

module.exports = router;