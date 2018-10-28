var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var User = require('../models/user.model');
var config = require('../config/config');
var Web3 = require('web3');

var web3 = new Web3(config.web3Provider);

/* Create system user */
User.find({email: config.system.account})
    .then(user => {
        if (user.length == 0) {
            var date = new Date();
            date.setMonth(date.getMonth() - 12 * 20);
            const user = new User({
                email: config.system.account,
                name: 'system',
                gender: 'male',
                birthday: date,
                keyStore: JSON.parse(config.system.keystore)
            });
                
            user.save()
                .then(savedUser => console.info(savedUser))
                .catch(e => console.error);
        }
    })
    .catch(e => console.error);

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
        .then(savedUser => console.info(savedUser))
        .catch(e => console.error);
}