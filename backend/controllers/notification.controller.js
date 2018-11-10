var Question = require('../models/question.model');

/**
 * Get notification list.
 * @property {number} req.query.skip - Number of questions to be skipped.
 * @property {number} req.query.limit - Limit number of questions to be returned.
 * @returns {Question[]}
 */
async function list(req, res, next) {
    const { limit = 50, skip = 0, q = {}} = req.query;
    
    q.createdBy = req.decoded._id
    
    try {
      var notifications = [];
      var answers = await Question.listQeustionsAnswers({ limit, skip, q });
      var likes = await Question.listQeustionsLikes({ limit, skip, q });
      notifications = notifications.concat(answers).concat(likes);
      res.json(notifications)
    } catch (e) {
      next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true));
    }
  }

module.exports = { list };