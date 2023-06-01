// Import the necessary dependencies
const express = require('express');
const { LearnedBirds } = require('../models/learnedBirds');

// Create router
const learnedBirdsRouter = express.Router();

// POST route to add a learnedBird
learnedBirdsRouter.post('/', (req, res) => {
  const { birdId, userId, guessedAt } = req.body; // Assuming the request body contains the birdId and userId

  // Create a new learnedBird entry in the database
  LearnedBirds.create({ birdId, userId, guessedAt})
    .then((learnedBird) => {
      res.status(201).json(learnedBird); // Return the created learnedBird as the response
    })
    .catch((error) => {
      console.error('Error adding learnedBird:', error);
      res.status(500).json({ error: 'Failed to add learnedBird' });
    });
});


// GET route to fetch learned birds for a user
learnedBirdsRouter.get('/', (req, res) => {
  const { userId } = req.query; // Assuming the userId is passed as a query parameter

  // Find all learnedBirds for the given userId
  LearnedBirds.findAll({ where: { userId } })
    .then((learnedBirds) => {
      res.status(200).json(learnedBirds); // Return the learnedBirds as the response
    })
    .catch((error) => {
      console.error('Error fetching learnedBirds:', error);
      res.status(500).json({ error: 'Failed to fetch learnedBirds' });
    });
});


// Export the router
module.exports = {
  learnedBirdsRouter,
};
