var Event = require('../models/event.model');

/**
 * Get event list.
 * @property {number} req.query.skip - Number of events to be skipped.
 * @property {number} req.query.limit - Limit number of events to be returned.
 * @property {string} req.query.createdBy - filter of events to be returned.
 * @returns {Event[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0, q = { $or: [ {from: req.decoded._id}, {to: req.decoded._id} ] }} = req.query;
    Event.list({ skip, limit, q })
      .then(events => res.json(events))
      .catch(e => next(e));
  }
  
  /**
   * Create new event
   */
  function create(req, res, next) {
    const from = req.from;
    const to = req.to;
    const tokens = req.tokens;
    const actionType = req.actionType;
    const tx = req.tx;

    console.info('New event=> from: %s, to: %s, tokens: %s, actionType: %s, tx: %s', from, to, tokens, actionType, tx);

    const event = new Event({
      actionType: actionType,
      from: from,
      to: to,
      tokens: tokens,
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