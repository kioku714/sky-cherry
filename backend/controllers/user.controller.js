var User = require('../models/user.model');
var config = require('../config/config');
var Tx = require('ethereumjs-tx');
var APIError = require('../helpers/APIError');
var Web3 = require('web3');

var web3 = new Web3(config.web3Provider);
const contract = new web3.eth.Contract(JSON.parse(config.contractABI), config.contractAccount);

var nonces = {};

createTestUsers();

function createTestUsers() {
    /* Create system user */
    User.find({email: config.system.account})
    .then(user => {
        if (user.length < 1) {
            var date = new Date();
            date.setMonth(date.getMonth() - 12 * 20);
            const user = new User({
                email: config.system.account,
                name: 'system',
                gender: 'male',
                birthday: date,
                keyStore: JSON.parse(config.system.keyStore)
            });
                
            user.save()
                .then(savedUser => console.log(savedUser.email))
                .catch(e => console.error);
        }
    })
    .then( () => {
        /* Create test user */
        var testAccounts = config.testAccounts.split(",");
        if (testAccounts.length > 0) {
            testAccounts.forEach(function(email) {
                User.find({email: email})
                    .then(user => {
                        if (user.length == 0) {
                            createAccount(email);
                        }
                    })
                    .catch(e => console.error);
            });
        }
    })
    .catch(e => console.error);
}

async function createAccount(email) {
    var name = email.split('@')[0];
    var account = web3.eth.accounts.create();
    var encryption = web3.eth.accounts.encrypt(account.privateKey, config.commonPassword);
    var date = new Date();
    date.setMonth(date.getMonth() - 12 * 20);
    const user = new User({
        email: email,
        name: name,
        si: (Math.floor(Math.random() * 20) + 1),
        gender: 'male',
        birthday: date,
        keyStore: encryption
    });

    user.save()
        .then(async(savedUser) => {
            console.log(savedUser.email);

            var walletInfo = web3.eth.accounts.decrypt(config.system.keyStore, config.commonPassword);
            var to = savedUser.keyStore.address;
            var tokens = web3.utils.toWei('50', 'ether');
            var data = contract.methods.transfer(to, tokens).encodeABI();
            
            await sendTransaction(walletInfo, config.contractAccount, data, 0);
        })
        .catch(e => console.error);
}

async function sendTransaction(walletInfo, to, data, value) {
    var myAddress = walletInfo.address;
    var privateKey = new Buffer(walletInfo.privateKey.replace('0x', ''), 'hex')
    var result = {
        nonceFromNode : '',
        nonceFromMemory : '',
        txHash : ''
    };
    let nonce = await web3.eth.getTransactionCount(myAddress);
    result.nonceFromNode = nonce;

    var rawTx = {
        nonce : web3.utils.toHex(getUpdatedNonce(myAddress, nonce)),
        gasPrice: web3.utils.toHex(config.gasPrice),
        gasLimit: web3.utils.toHex(config.gasLimit),
        to: web3.utils.toHex(to),
        value: web3.utils.toHex(value),
        data: data
    }
    result.nonceFromMemory = rawTx.nonce;

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    await web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, hash) {
        if (!error) {
            result.txHash = hash;
            console.log('=================================');
            console.log('result.txHash: ' + result.txHash);
            console.log('=================================');
        } else {
            throw new APIError('Transaction error: ' + error);
        }
    });

    return result;
}

function getUpdatedNonce(address, systemNonce) {
    if(nonces[address]) {
        nonces[address] = (nonces[address] < systemNonce) ? systemNonce : nonces[address]+1;
    } else {
        nonces[address] = systemNonce;
    }
    return nonces[address];
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
      .then((user) => {
        req.user = user; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
  }
  
  /**
   * Get user
   * @returns {User}
   */
  function get(req, res) {
    return res.json(req.user);
  }
  
  /**
   * Create new user
   * @property {string} req.body.name - The name of user.
   * @property {string} req.body.email - The email of user.
   * @returns {User}
   */
  function create(req, res, next) {
    const user = new User({
      email: req.body.email,
      role: req.body.role,
      status: req.body.status
    });
  
    user.save()
      .then(savedUser => res.json(savedUser))
      .catch((e) => {
        next(new APIError(e.message, httpStatus.BAD_REQUEST));
      });
  }
  
  /**
   * Update existing user
   * @property {string} req.body.email - The email of user.
   * @returns {User}
   */
  function update(req, res, next) {
    const user = new User(req.user);
    
    // TODO
    if (req.body.name) {
      user.name = req.body.name;
    }
  
    User.update({_id: user.id}, user)
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  }
  
  /**
   * Get user list.
   * @property {number} req.query.skip - Number of users to be skipped.
   * @property {number} req.query.limit - Limit number of users to be returned.
   * @returns {User[]}
   */
  function list(req, res, next) {
    const { limit = 50, skip = 0, q = {}} = req.query;
    User.list({ limit, skip, q })
      .then(users => res.json(users))
      .catch(e => next(e));
  }
  
  /**
   * Delete user.
   * @returns {User}
   */
  function remove(req, res, next) {
    const user = req.user;
    user.remove()
      .then(deletedUser => res.json(deletedUser))
      .catch(e => next(e));
  }

  module.exports = { load, get, create, update, list, remove };
