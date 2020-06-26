const Router = require('express').Router(),
      chModal = require('./models/characterModel'),
      hModal  = require('./models/houseModel');

Router.route('/characters').get((req, res) => {
  chModal.find({}).exec((error, docs) => {
    if (error) {
      res.status(500);
      res.json(error);
    }
    res.json(docs)
  })
})

module.exports = Router