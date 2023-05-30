const locationDataRouter = require('express').Router();
const { Trails } = require('../models/trails.js');

//grab the names of the locations saved to mysql
locationDataRouter.route('/').get((req, res) => {
  Trails.find({})
    .then(trails => {
      res.json(trails);
    })
    .catch(err =>
        res.status(404).send('Could not fetch location data from database' + err)
      );
});