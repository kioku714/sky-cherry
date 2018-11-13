var User = require('../models/user.model');
var config = require('../config/config');
var Tx = require('ethereumjs-tx');
var APIError = require('../helpers/APIError');

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
 */
function update(req, res, next) {
    const user = new User(req.user);
    const firstUpdate = user.modifiedAt ? false : true;

    user.modifiedAt = Date.now();

    if (req.body.occupation) {
        user.occupation = req.body.occupation;
    }
    if (req.body.familyType) {
        user.familyType = req.body.familyType;
    }
    if (req.body.interest) {
        user.interest = req.body.interest;
    }
    if (req.body.monthlyIncome) {
        user.monthlyIncome = req.body.monthlyIncome;
    }
    if (req.body.assets) {
        user.assets = req.body.assets;
    }
    if (req.body.incomeManagement) {
        user.incomeManagement = req.body.incomeManagement;
    }
    if (req.body.description) {
        user.description = req.body.description;
    }

    User.update({_id: user.id}, user)
        .then(savedUser =>  {
            if(firstUpdate) {
            next();
            } else {
            res.json(savedUser);
            }
        })
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
