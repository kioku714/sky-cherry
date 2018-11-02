var mongoose = require('mongoose');
var config = require('../config/config');

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
        ref: 'SkyCherryUser',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkyCherryUser',
        required: false
    }]
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
};

/**
 * @typedef Answer
 */
module.exports = mongoose.model('Answer', AnswerSchema);
