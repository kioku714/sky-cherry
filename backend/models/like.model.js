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
        refPath: 'onModel',
        required: true
    },
    onModel: {
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
};

/**
 * @typedef Answer
 */
module.exports = mongoose.model('Like', LikeSchema);
