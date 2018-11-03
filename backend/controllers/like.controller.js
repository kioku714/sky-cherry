var Like = require('../models/like.model');

/**
 * Create new like
 * @property {string} req.body.createdBy
 * @property {string} req.body.questionOrAnswer
 * @returns {Like}
 */
function create(req, res, next) {
    const like = new Like({
        createdAt: Date.now(),
        createdBy: req.body.createdBy,
        questionOrAnswer: req.body.questionOrAnswer
    });

    like.save()
        .then(savedLike => {
            var walletInfo = web3.eth.accounts.decrypt(config.system.keyStore, config.commonPassword);
            var to = savedUser.keyStore.address;
            const tokens = web3.utils.toWei('50', 'ether');
            const coins = web3.utils.toWei('0.01'.toString(), 'ether');
            var data = contract.methods.transfer(to, tokens).encodeABI();
            
            await sendTransaction(walletInfo, config.contractAccount, data, 0);
        })
        .catch(e => next(e));
}

module.exports = { create };