var Promise = require('bluebird');
var mongoose = require('mongoose');
var httpStatus = require('http-status');
var autoIncrement = require('mongoose-auto-increment');
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
        // required: true
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
    gender: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    familtyType: {
        type: String,
        required: false
    },
    interest: {
        type: String,
        required: false
    },
    montlyIncome: {
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
    list({ skip = 0, limit = 50 } = {}) {
      return this.find()
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    },
  
    /**
     * Get question
     * @param {Number} no - The Number of question.
     * @returns {Promise<Question, APIError>}
     */
    get(no) {
      return this.findOne({ no: parseInt(no) })
        .populate('createdBy')
        .populate('answers')
        .populate('likes')
        .exec()
        .then((question) => {
          if (question) {
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
autoIncrement.initialize(mongoose.connection);
/**
 * 1씩 증가하는 primary Key 생성
 * model : 생성할 document 이름
 * field : primary key
 * startAt : 1부터 시작
 */
QuestionSchema.plugin(autoIncrement.plugin , { 
  model: 'Question', 
  field: 'no', 
  startAt: 1,
  incrementBy: 1
});
