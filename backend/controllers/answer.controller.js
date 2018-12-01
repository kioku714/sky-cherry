var Answer = require('../models/answer.model');

/**
 * Create new answer
 * @property {string} req.body.description
 * @property {ObjectId} req.body.questionId
 * @returns {Answer}
 */
function create(req, res, next) {
  let description = req.body.description;
  let questionId = req.body.questionId;
  let userId = req.decoded._id;

  const answer = new Answer({
    description: description,
    createdAt: Date.now(),
    createdBy: userId,
    question: questionId
  });

  answer.save()
    .then(() => {
        next();
    })
    .catch(e => next(e));
}

/**
   * Load answer and append to req.
   */
  function load(req, res, next, answerId) {
    Answer.get(answerId)
      .then((answer) => {
        req.answer = answer;
        return next()
      }) 
      .catch(e => next(e));
  }
  
  /**
   * Get answer
   * @returns {answer}
   */
  function get(req, res) {
    return res.json(req.answer);
  }

/**
 * Get answer list.
 * @property {number} req.query.skip - Number of answers to be skipped.
 * @property {number} req.query.limit - Limit number of answers to be returned.
 * @property {string} req.query.createdBy - filter of answers to be returned.
 * @returns {Answer[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0, q = {}} = req.query;
    if(req.query.createdBy) {
      q.createdBy = req.query.createdBy
    }
    if(req.query.sort) {
      q.sort = req.query.sort
    }
    if(req.query.question) {
      q.question = req.query.question
    }
    Answer.list({ limit, skip, q })
      .then(answers => res.json(answers))
      .catch(e => next(e));
  }

  module.exports = { list, create, load, get };