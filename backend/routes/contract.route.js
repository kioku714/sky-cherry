var express = require('express');
var contractCtrl = require('../controllers/contract.controller');

const router = express.Router();

router.route('/tokens')
  .get(contractCtrl.getTotalTokens)
  .post(contractCtrl.sendTokens)

router.route('/transfer')
  .post(contractCtrl.transfer)

router.route('/:id/approval')
  .post(contractCtrl.approval)
  
router.route('/receipts')
  .get(contractCtrl.getReceiptList)

router.param('id', contractCtrl.load);

module.exports = router;