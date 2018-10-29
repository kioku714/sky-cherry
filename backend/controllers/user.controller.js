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
                .then(savedUser => console.info(savedUser))
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
        gender: 'male',
        birthday: date,
        keyStore: encryption
    });

    user.save()
        .then(async(savedUser) => {
            console.info(savedUser);

            var walletInfo = web3.eth.accounts.decrypt(config.system.keyStore, config.commonPassword);
            var to = savedUser[0].keyStore.address;
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