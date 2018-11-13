var User = require('../models/user.model');
var Event = require('../models/event.model');
var User = require('../models/user.model');
var Contract = require('../models/contract.model');
var config = require('../config/config');
var Tx = require('ethereumjs-tx');
var APIError = require('../helpers/APIError');
var actionType = require('../helpers/Type').actionType;

var Web3 = require('web3');

var web3 = new Web3(config.web3Provider);
const contract = new web3.eth.Contract(JSON.parse(config.contractABI), config.contractAccount);

var nonces = {};

const tokens = 50;
const coins = 0.01;

(async() => {
    const systemUser = await createOrGetSystemUser();

    const testAccounts = config.testAccounts.split(",");
    testAccounts.forEach(async function(email) {
        await createOrGetTestUser(email, systemUser);
    });
})()

async function createOrGetSystemUser() {
    var systemUser = await User.findOne({email: config.system.account});
    if(!systemUser) {
        var date = new Date();
        date.setMonth(date.getMonth() - 12 * 20);

        const user = new User({
            email: config.system.account,
            name: 'system',
            gender: 'male',
            birthday: date,
            keyStore: JSON.parse(config.system.keyStore)
        });
            
        systemUser = await user.save();
    }
    return systemUser;
}

async function createOrGetTestUser(email, systemUser) {
    var user = await User.findOne({email: email});
    if(!user) {
        user = await createAccount(email);

        var from = systemUser._id;
        var fromKeyStore = systemUser.keyStore;
        var to = user._id;
        var toKeyStore = user.keyStore;

        var walletInfo = web3.eth.accounts.decrypt(fromKeyStore, config.commonPassword);
        var data = contract.methods.transfer(toKeyStore.address, web3.utils.toWei(tokens.toString(), 'ether')).encodeABI();
        var result = await Contract.sendTx(walletInfo, config.contractAccount, data, 0);
        await createEvent(from, to, tokens, actionType.SIGNUP, result.txHash);
        await Contract.sendTx(walletInfo, toKeyStore.address, '0x00', web3.utils.toWei(coins.toString(), 'ether'));
    }
    return user;
}

async function createEvent(from, to, tokens, actionType, tx) {
    console.info('New event=> from: %s, to: %s, tokens: %s, actionType: %s, tx: %s', from, to, tokens, actionType, tx);

    const event = new Event({
      actionType: actionType,
      from: from,
      to: to,
      tokens: tokens,
      createdAt: Date.now(),
      createdBy: from,
      tx: tx
    });
  
    await event.save().then().catch(e => console.error);
}

async function createAccount(email) {
    /*
     * gender, level 결과가 다양하게 나오도록 중복 데이터 입력.
     */
    var gender = new Array("male", "female", "male", "female", "male", "female");
    var level = new Array("Black", "Red", "Green", "Blue", "Black", "Red", "Green", "Blue");
    // Math.floor(Math.random() * (max - min)) + min
    var gender_index = Math.floor(Math.random() * (5 - 0)) + 0;
    var level_index  = Math.floor(Math.random() * (7 - 0)) + 0;
    var name = email.split('@')[0];
    var account = web3.eth.accounts.create();
    var encryption = web3.eth.accounts.encrypt(account.privateKey, config.commonPassword);
    var date = new Date();
    var age_random = Math.floor(Math.random() * (45 - 20)) + 20;
    date.setMonth(date.getMonth() - 12 * age_random);
    const user = new User({
        email: email,
        name: name,
        si: (Math.floor(Math.random() * 20) + 1),
        gender: gender[gender_index],
        level: level[level_index],
        birthday: date,
        keyStore: encryption
    });

    const savedUser = await user.save();
    return savedUser;
}
