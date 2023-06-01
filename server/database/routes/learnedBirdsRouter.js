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

// Export the router
module.exports = {
  learnedBirdsRouter,
};
