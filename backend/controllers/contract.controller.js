var config = require('../config/config');
var User = require('../models/user.model');
var Contract = require('../models/contract.model');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var APIError = require('../helpers/APIError');
var httpStatus = require('http-status');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
const contract = new web3.eth.Contract(JSON.parse(config.contractABI), config.contractAccount);

function getUserTokens(req, res) {
	const tokenOwner = req.user.keyStore.address;

	contract.methods.balanceOf(tokenOwner).call()
	.then(function (balance) {
		return res.send({"tokens" : web3.utils.fromWei(balance)});
	});
}

function getReceiptList(req, res) {
	contract.getPastEvents('Transfer', {
		fromBlock: 0,
		toBlock: 'latest'
	}, function(error, events){
		var eventsArray = []
		for (i in events) {
			var event = {
				'tx' : events[i].transactionHash,
				'block' : events[i].blockHash,
				'from' : events[i].returnValues.from,
				'to' : events[i].returnValues.to,
				'value' : web3.utils.fromWei(events[i].returnValues.value)
			}
			eventsArray.push(event)
		}
		return res.send(eventsArray);
	})
}

async function sendTokens(req, res, next) {
	const from = req.from;
	const to = req.to;
	const tokens = req.tokens;

	const fromUser = await User.get(from);
	const toUser = await User.get(to);
	console.info('sendTokens => from: %s, to: %s, tokens: %d', fromUser.name, toUser.name, tokens);

	var walletInfo = web3.eth.accounts.decrypt(fromUser.keyStore, config.commonPassword);
	var data = contract.methods.transfer(toUser.keyStore.address, web3.utils.toWei(tokens.toString(), 'ether')).encodeABI();
	try {
		const result = await Contract.sendTx(walletInfo, config.contractAccount, data, 0);
		req.tx = result.txHash;
		next();
	} catch (e) {
		console.error(e)
		next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true));
	}
}

function transfer(req, res, next) {
	const contract = contract;
	const to = req.body.receiver;
	const tokens = web3.utils.toWei(req.body.tokens.toString(), 'ether');
	const password = req.body.password;

	User.get(req.decoded._id)
    .then(async (user) => {
		var walletInfo = web3.eth.accounts.decrypt(user.keyStore, password);
		var data = contract.methods.transfer(to, tokens).encodeABI();
		try{
			res.send(await Contract.sendTx(walletInfo, config.contractAccount, data, 0));
		} catch (e) {
			throw e;
		}
    })
    .catch((e) => {
      next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true));
    });
}

function getUserCoins(req, res, next) {
	web3.eth.getBalance(req.user.keyStore.address, function(err, result) {
		return res.send({"coins" : web3.utils.fromWei(result)});
	});
}

async function tokenExchange(req, res, next) {
	try {
		var ether = String(req.body.token / 2200)
		await sendTokensToSystem(req, res, next);

		var walletInfo = web3.eth.accounts.decrypt(config.system.keyStore, config.commonPassword);
		res.send(await Contract.sendTx(walletInfo, req.decoded.walletInfo.address, '0x00', web3.utils.toWei(ether, 'ether')))
	} catch (e) {
		next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true));
	}
}

module.exports = { getReceiptList, sendTokens, getUserTokens, getUserCoins, transfer, tokenExchange };