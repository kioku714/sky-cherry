var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port);

/**
 * Answer Schema
 */
const LikeSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkyCherryUser',
        required: true
    },
    questionOrAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'questionOrAnswerModel',
        required: true
    },
    questionOrAnswerModel: {
      type: String,
      enum: ['Question', 'Answer']
    }
});

/**
 * Methods
 */
LikeSchema.method({
});

/**
 * Statics
 */
LikeSchema.statics = {
    /**
     * List likes in ascending order of 'dueDate'.
     * @param {number} skip - Number of likes to be skipped.
     * @param {number} limit - Limit number of likes to be returned.
     * @returns {Promise<Like[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
      return this.find()
        .populate('createdBy')
        .populate({
          path: 'questionOrAnswer',
          populate: { path: 'createdBy' }
        })
        .sort({ createdAt: 1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    },
  
    /**
     * Get like
     * @param {ObjectId} id - The objectId of like.
     * @returns {Promise<Like, APIError>}
     */
    get(id) {
      this.findById(id)
        .exec()
        .then((like) => {
          if (like) {
            return like;
          }
          const err = new APIError('No such like exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }
  };

/**
 * @typedef Answer
 */
module.exports = mongoose.model('Like', LikeSchema);
