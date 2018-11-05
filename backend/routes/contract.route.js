var express = require('express');
var contractCtrl = require('../controllers/contract.controller');
var config = require('../config/config');
var expressJwt = require('express-jwt');
const auth = expressJwt({secret: config.jwtSecret, requestProperty: 'decoded'})

const router = express.Router();

router.route('/tokens')
  .get(contractCtrl.getTotalTokens)
  .post(contractCtrl.sendTokens)

router.route('/transfer')
  .post(contractCtrl.transfer)

router.route('/tokenExchange')
  .post(auth, contractCtrl.tokenExchange)

router.route('/approval')
  .post(contractCtrl.approval)
  
router.route('/receipts')
  .get(contractCtrl.getReceiptList)

module.exports = router;