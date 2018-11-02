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
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        required: false
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
        required: false
    }],
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
      return this.find(q)
        .populate('createdBy')
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
            },
            { 
                $lookup: { 
                    from: 'skycherryusers', 
                    localField: 'answers.createdBy', 
                    foreignField: '_id', 
                    as: 'answerUser' 
                }
            },
            { 
                $lookup: { 
                    from: 'likes', 
                    localField: 'answers._id', 
                    foreignField: 'questionOrAnswer', 
                    as: 'answerLikes' 
                }
            }
        ])
        .exec()
        .then((questions) => {
            if (questions.length > 0) {
                var question  = questions[0];
                if ( question.answers.length > 0) {
                    question.answers.forEach(function(answer, index) {
                        answer.createdBy = question.answerUser[index];
                    });
                    question.answers.forEach(function(answer) {
                        question.answerLikes.forEach(function(likes) {
                            if (answer._id.toString() == likes.questionOrAnswer.toString()) {
                                answer.likes.push(likes.createdBy);
                            }
                        });
                    });
                }
                delete question.answerUser;
                delete question.answerLikes;
                // console.log(JSON.stringify(question));
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
