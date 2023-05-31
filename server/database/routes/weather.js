const locationDataRouter = require('express').Router();
const favoriteTrailsRouter = require('express').Router();
const { Trails } = require('../models/trails.js');
const { Users } = require('./database/models/users');

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

//get the users favorite trails from the db
favoriteTrailsRouter.route('/').get(async (req, res) => {
  try {
    const userGoogleId = req.user.googleId;
    const user = await Users.find({ googleId: userGoogleId });
    //check if user exists/logged in
    if (!user) {
      res.status(404).send('Error could not find user');
    }
    //find the trails
    res.status(200).json(user.favoriteTrails);
  } catch (error) {
    res.status(500).send('Error could not find user favoriteTrails');
  }
});