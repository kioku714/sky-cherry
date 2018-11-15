var config = require('../config/config');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));

async function sendTx(walletInfo, to, data, value) {
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
		nonce : web3.utils.toHex(_getUpdatedNonce(myAddress, nonce)),
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
			console.info('tx=>', hash)
			result.txHash = hash;
		} else {
			throw new APIError('Transaction error: ' + error);
		}
	});

	return result;
}

var nonces = {};

function _getUpdatedNonce(address, systemNonce) {
	if(nonces[address]) {
		nonces[address] = (nonces[address] < systemNonce) ? systemNonce : nonces[address]+1;
	} else {
		nonces[address] = systemNonce;
	}
	return nonces[address];
}

module.exports = { sendTx }