var jwt = require('jsonwebtoken');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var User = require('../models/user.model');
var config = require('../config/config');
var Web3 = require('web3');

var web3 = new Web3(config.web3Provider);

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

async function login(req, res, next) {
  const system = await User.getByEmail(config.system.account);
  User.getByEmail(req.body.email)
    .then((user) => {
      var walletInfo = web3.eth.accounts.decrypt(user.keyStore, req.body.password);
      var options = {expiresIn: 60*60*24};
      const token = jwt.sign({
        _id: user._id,
        system_id: system._id,
        address: walletInfo.address,
        walletInfo: walletInfo
      }, config.jwtSecret, options);
      
      return res.json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email
      });
    })
    .catch((e) => {
      next(new APIError(e.message, httpStatus.UNAUTHORIZED, true));
    });
}

module.exports = { login };