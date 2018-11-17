var Promise = require('bluebird');
var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port);

/**
 * Event Schema
 */
const EventSchema = new mongoose.Schema({
    actionType: {
        type: String,   //{likeQuestion|likeAnswer|likeMyQuestion|likeMyAnswer|answer|question|signup|profile}
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tokens: {
        type: Number,
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
    tx: {
        type: String,
        required: false
    }
});

/**
 * Methods
 */
EventSchema.method({
});

/**
 * Statics
 */
EventSchema.statics = {
    /**
     * @param {number} skip - Number of event to be skipped.
     * @param {number} limit - Limit number of event to be returned.
     * @param {number} q - query of event to be searched.
     * @returns {Promise<Event[]>}
     */
    list({ skip = 0, limit = 50, q = {} } = {}) {
      return this.find(q)
        .populate('createdBy')
        .populate('from')
        .populate('to')
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
  
};

/**
 * @typedef Event
 */
module.exports = mongoose.model('Event', EventSchema);
