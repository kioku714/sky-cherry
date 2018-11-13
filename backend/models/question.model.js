var Promise = require('bluebird');
var mongoose = require('mongoose');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var config = require('../config/config');

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port);

/**
 * Question Schema
 */
const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainField: {
        type: String,
        required: false
    },
    subField: {
        type: String,
        required: false
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
    occupation: {
        type: String,
        required: false
    },
    familyType: {
        type: String,
        required: false
    },
    interest: {
        type: String,
        required: false
    },
    monthlyIncome: {
        type: String,
        required: false
    },
    assets: {
        type: String,
        required: false
    },
    incomeManagement: {
        type: String,
        required: false
    },
    tags: [{
        type: String,
        required: false
    }]
});

/**
 * Methods
 */
QuestionSchema.method({
});

/**
 * Statics
 */
QuestionSchema.statics = {
    /**
     * @param {number} skip - Number of question to be skipped.
     * @param {number} limit - Limit number of question to be returned.
     * @returns {Promise<Question[]>}
     */
    list({ skip = 0, limit = 50, q = {} } = {}) {
        var aggr = [];
        if(q.createdBy) {
            aggr.push({
                $match: {'createdBy': mongoose.Types.ObjectId(q.createdBy)}
            })
        }
        aggr.push({ 
            $lookup: { 
                from: 'Users', 
                localField: 'createdBy', 
                foreignField: '_id', 
                as: 'createdBy'
            }
        },
        {
            $unwind: {
                path: '$createdBy',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'answers', 
                localField: '_id', 
                foreignField: 'question', 
                as: 'answers' 
            }
        },
        { 
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
     * Get question
     * @param {ObjectId} id - The ObjectId of question.
     * @returns {Promise<Question, APIError>}
     */
    get(id) {
      return this.aggregate([
            {
                $match: { 
                    _id: mongoose.Types.ObjectId(id) 
                } 
            },
            { 
                $lookup: { 
                    from: 'users', 
                    localField: 'createdBy', 
                    foreignField: '_id', 
                    as: 'createdBy' 
                }
            },
            {
                $unwind: {
                    path: '$createdBy',
                    preserveNullAndEmptyArrays: true
                }
            },
            { 
                $lookup: { 
                    from: 'likes', 
                    localField: '_id', 
                    foreignField: 'questionOrAnswer', 
                    as: 'likes' 
                }
            },
            { 
                $lookup: { 
                    from: 'answers', 
                    localField: '_id', 
                    foreignField: 'question', 
                    as: 'answers' 
                }
            }
        ])
        .exec()
        .then((questions) => {
            if (questions.length > 0) {
                var question  = questions[0];
                return question;
            }
            const err = new APIError('No such question exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
    },

    /**
     * @param {number} skip - Number of question to be skipped.
     * @param {number} limit - Limit number of question to be returned.
     * @returns {Promise<Question[]>}
     */
    listQeustionsAnswers({ skip = 0, limit = 50, q = {} } = {}) {
        var aggr = [];
        if(q.createdBy) {
            aggr.push({
                $match: {'createdBy': mongoose.Types.ObjectId(q.createdBy)}
            })
        }
        aggr.push(
        {
            $lookup: {
                from: 'answers', 
                localField: '_id', 
                foreignField: 'question', 
                as: 'answer' 
            }
        },
        { 
            $unwind: "$answer" 
        },
        { 
            $lookup: {
                from: 'Users', 
                localField: 'answer.createdBy', 
                foreignField: '_id', 
                as: 'answer.createdBy'
            }
        },
        {
            $unwind: {
                path: '$answer.createdBy',
                preserveNullAndEmptyArrays: true
            }
        },
        { 
            $project: { 
                'title': 1,
                'answer': 1
            }
        }
        )
        return this.aggregate(aggr)
        .sort({ 'answer.createdAt': -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    },

    /**
     * @param {number} skip - Number of question to be skipped.
     * @param {number} limit - Limit number of question to be returned.
     * @returns {Promise<Question[]>}
     */
    listQeustionsLikes({ skip = 0, limit = 50, q = {} } = {}) {
        var aggr = [];
        if(q.createdBy) {
            aggr.push({
                $match: {'createdBy': mongoose.Types.ObjectId(q.createdBy)}
            })
        }
        aggr.push(
        {
            $lookup: {
                from: 'likes', 
                localField: '_id', 
                foreignField: 'questionOrAnswer', 
                as: 'like'
            }
        },
        { 
            $unwind: "$like" 
        },
        { 
            $lookup: {
                from: 'Users', 
                localField: 'like.createdBy', 
                foreignField: '_id', 
                as: 'like.createdBy'
            }
        },
        {
            $unwind: {
                path: '$like.createdBy',
                preserveNullAndEmptyArrays: true
            }
        },
        { 
            $project: { 
                'title': 1,
                'like': 1
            }
        }
        )
        return this.aggregate(aggr)
        .sort({ 'like.createdAt': -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
    
};

/**
 * @typedef Question
 */
module.exports = mongoose.model('Question', QuestionSchema);
