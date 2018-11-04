var Answer = require('../models/answer.model');

/**
 * Create new answer
 * @property {string} req.body.description
 * @property {ObjectId} req.body.createdBy
 * @property {ObjectId} req.body.question
 * @returns {Answer}
 */
function create(req, res, next) {
    const answer = new Answer({
        description: req.body.description,
        createdAt: Date.now(),
        createdBy: req.body.createdBy,
        question: req.body.question
    });

    answer.save()
      .then(() => {
          next();
      })
      .catch(e => next(e));
}

module.exports = { create };