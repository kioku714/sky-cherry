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
        ref: 'SkyCherryUser',
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
                from: 'skycherryusers', 
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
                    from: 'skycherryusers', 
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
    }
};

/**
 * @typedef Question
 */
module.exports = mongoose.model('Question', QuestionSchema);
