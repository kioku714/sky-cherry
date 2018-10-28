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

function login(req, res, next) {
  User.getByEmail(req.body.email)
    .then((user) => {
      var walletInfo = {};

      console.log(user);
      
      // if(config.root.id === user.email) {
      //   if(config.root.password === req.body.password) {
      //     walletInfo.address = user.keyStore.address;
      //   } else {
      //     throw new APIError('password invalid.', httpStatus.UNAUTHORIZED, true);
      //   }
      // } else {
      //   walletInfo = web3.eth.accounts.decrypt(user.keyStore, req.body.password);
      // }

      var options = {expiresIn: 60*60*24};
      const token = jwt.sign({
        _id: user._id,
        address: walletInfo.address
      }, config.jwtSecret, options);
      
      return res.json({
        token,
        email: user.email,
        name: user.name
      });
    })
    .catch((e) => {
      next(new APIError(e.message, httpStatus.UNAUTHORIZED, true));
    });
}

module.exports = { login };