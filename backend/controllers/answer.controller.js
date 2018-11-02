var Answer = require('../models/answer.model');

/**
 * Create new question
 * @property {string} req.body.title
 * @property {string} req.body.description
 * @property {string} req.body.mainField
 * @property {string} req.body.subField
 * @property {Answer[]} req.body.answers
 * @property {like[]} req.body.likes
 * @property {string} req.body.occupation
 * @property {string} req.body.familyType
 * @property {string} req.body.interest
 * @property {string} req.body.monthlyIncome
 * @property {string} req.body.assets
 * @property {string} req.body.incomeManagement
 * @property {string[]} req.body.tags
 * @returns {Question}
 */
function create(req, res, next) {
    const answer = new Answer({
        description: req.body.description,
        createdAt: Date.now(),
        createdBy: req.body.createdBy,
        question: req.body.question
    });

    answer.save()
      .then(savedAnswer=> res.json(savedAnswer))
      .catch(e => {
          console.log(e);
          next(e);
      });
}

module.exports = { create };