var APIError = require('../helpers/APIError');
var httpStatus = require('http-status');
var Like = require('../models/like.model');
var User = require('../models/user.model');
var Question = require('../models/question.model');
var Answer = require('../models/answer.model');

/**
 * Create new like
 * @property {string} req.body.createdBy
 * @property {string} req.body.questionId
 * @property {string} req.body.answerId
 * @returns {Like}
 */
async function create(req, res, next) {
    const questionId = req.body.questionId
    const answerId = req.body.answerId
    
    let questionOrAnswer;
    let questionOrAnswerModel;
    if(questionId) {
        questionOrAnswer = questionId;
        questionOrAnswerModel = 'Question';
        const question = await Question.get(questionId);
        req.body.reqreceiveUser = question.createdBy[0];
    } else if(answerId) {
        questionOrAnswer = answerId;
        questionOrAnswerModel = 'Answer';
        const answer = await Answer.get(answerId);
        req.body.reqreceiveUser = answer.createdBy;
    } else {
        next(new APIError('answerId or questionId required.', httpStatus.INTERNAL_SERVER_ERROR, true));
    }
    
    const like = new Like({
        createdAt: Date.now(),
        createdBy: req.decoded._id,
        questionOrAnswer: questionOrAnswer,
        questionOrAnswerModel: questionOrAnswerModel
    });

    like.save()
        .then(() => {
            next();
        });
}

/**
   * Load like and append to req.
   */
  function load(req, res, next, likeId) {
    Like.get(likeId)
      .then((like) => {
        req.like = like;
        return next()
      }) 
      .catch(e => next(e));
  }
  
  /**
   * Get like
   * @returns {like}
   */
  function get(req, res) {
    return res.json(req.like);
  }

/**
 * Get like list.
 * @property {number} req.query.skip - Number of likes to be skipped.
 * @property {number} req.query.limit - Limit number of likes to be returned.
 * @property {string} req.query.createdBy - filter of likes to be returned.
 * @returns {Like[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0, q = {}} = req.query;
    if(req.query.createdBy) {
      q.createdBy = req.query.createdBy
    }
    Like.list({ limit, skip, q })
      .then(likes => res.json(likes))
      .catch(e => next(e));
  }

  module.exports = { list, create, load, get };