var express = require('express');
var validate = require('express-validation');
var contractCtrl = require('../controllers/contract.controller');
var paramValidation = require('../config/param-validation');
var httpStatus = require('http-status');

const router = express.Router();

router.route('/tokenExchange')
  .post((req, res, next) => {
      req.from = req.decoded._id;
      req.to = req.decoded.system_id;
      req.tokens = req.body.tokens;
      next();
    },
    validate(paramValidation.sendTokens), contractCtrl.sendTokens,
    (req, res, next) => {
      req.from = req.decoded.system_id;
      req.to = req.decoded._id;
      req.coins = req.body.tokens / 2200;
      next();
    },
    validate(paramValidation.sendCoins), contractCtrl.sendCoins,
    (req, res) => res.json({}));
  
router.route('/receipts')
  .get(contractCtrl.getReceiptList);

module.exports = router;