var Like = require('../models/like.model');
var User = require('../models/user.model');

/**
 * Create new like
 * @property {string} req.body.createdBy
 * @property {string} req.body.questionOrAnswer
 * @returns {Like}
 */
function create(req, res, next) {
    const receiveUserId = req.body.questionOrAnswerCreatedBy
    const like = new Like({
        createdAt: Date.now(),
        createdBy: req.body.createdBy,
        questionOrAnswer: req.body.questionOrAnswer
    });

    User.get(receiveUserId)
        .then((user) => {
            req.body.reqreceiveUser = user;
        })
        .then(() => {
            like.save()
                .then(() => {
                    next();
                });
        })
        .catch(e => next(e));
}

module.exports = { create };