var Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      email: Joi.string().email().required()
    }
  },
  updateUser: {
    body: {
      email: Joi.string().email().required(),
      name: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  createEvent: {
    from: Joi.string().required(),
    to: Joi.string().required(),
    tokens: Joi.number().required(),
    eventType: Joi.string().required()
  },
  sendTokens: {
    from: Joi.string().required(),
    to: Joi.string().required(),
    tokens: Joi.number().required()
  },
  sendCoins: {
    from: Joi.string().required(),
    to: Joi.string().required(),
    coins: Joi.number().required()
  },
  createQuestion: {
    
  },
  createAnswer: {
    
  },
  createLike: {
    
  }
};