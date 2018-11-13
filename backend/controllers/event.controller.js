var Event = require('../models/event.model');

/**
 * Get event list.
 * @property {number} req.query.skip - Number of events to be skipped.
 * @property {number} req.query.limit - Limit number of events to be returned.
 * @property {string} req.query.createdBy - filter of events to be returned.
 * @returns {Event[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0, q = {}} = req.query;
    if(req.query.from) {
      q.from = req.query.from
    }
    if(req.query.to) {
      q.to = req.query.to
    }
    Event.list({ limit, skip, q })
      .then(events => res.json(events))
      .catch(e => next(e));
  }
  
  /**
   * Create new event
   */
  function create(req, res, next) {
    var from = req.from;
    var to = req.to;
    var value = req.value;
    var actionType = req.actionType;
    var tx = req.tx;

    console.info('Event=>', from, to, value, actionType, tx)

    const event = new Event({
      actionType: actionType,
      from: from,
      to: to,
      value: value,
      createdAt: Date.now(),
      createdBy: req.decoded._id,
      tx: tx
    });
  
    event.save()
      .then(savedEvent => {
        req.savedEvent = savedEvent;
        next();
      })
      .catch(e => next(e));
  }
  
module.exports = { list, create };