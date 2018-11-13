var mongoose = require('mongoose');
var config = require('../config/config');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port);

/**
 * Answer Schema
 */
const AnswerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
});

/**
 * Methods
 */
AnswerSchema.method({
});

/**
 * Statics
 */
AnswerSchema.statics = {
    /**
     * List answers in ascending order of 'dueDate'.
     * @param {number} skip - Number of answers to be skipped.
     * @param {number} limit - Limit number of answers to be returned.
     * @returns {Promise<Answer[]>}
     */
    list({ skip = 0, limit = 50, q = {} } = {}) {
        var aggr = [];
        if(q.createdBy) {
            aggr.push({
                $match: {'createdBy': mongoose.Types.ObjectId(q.createdBy)}
            })
        }
        if(q.question) {
            aggr.push({
                $match: {'question': mongoose.Types.ObjectId(q.question)}
            })
        }
        aggr.push({
            $lookup: { 
                from: 'questions', 
                localField: 'question', 
                foreignField: '_id', 
                as: 'question' 
            }
        },{
            $unwind: {
                path: '$question',
                preserveNullAndEmptyArrays: true
            }
        },{
            $lookup: { 
                from: 'users', 
                localField: 'createdBy', 
                foreignField: '_id', 
                as: 'createdBy' 
            }
        },{
            $unwind: {
                path: '$createdBy',
                preserveNullAndEmptyArrays: true
            }
        },{
            $lookup: { 
                from: 'likes', 
                localField: '_id', 
                foreignField: 'questionOrAnswer', 
                as: 'likes' 
            }
        })
        return this.aggregate(aggr)
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    },
  
    /**
     * Get answer
     * @param {ObjectId} id - The objectId of answer.
     * @returns {Promise<Answer, APIError>}
     */
    get(id) {
        return this.findById(id)
          .populate('createdBy')
          .exec()
          .then((answer) => {
            if (answer) {
              return answer;
            }
            const err = new APIError('No such answer exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
      }
  };

/**
 * @typedef Answer
 */
module.exports = mongoose.model('Answer', AnswerSchema);
