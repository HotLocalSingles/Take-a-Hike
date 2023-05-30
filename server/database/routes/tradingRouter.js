const express = require('express');
const tradingRouter = express.Router();
const { Posts } = require('../models/posts');


// Retrieve all posts from db
tradingRouter.get('/', async (req, res) => {

  try {
    const posts = await Posts.findAll();

    if(!posts) {
      res.sendStatus(404);
    }

    res.status(200).send(posts);

  } catch (error) {
    res.status(500).send(error);
  }
});


// Add a new post to db
tradingRouter.post('/:id', async (req, res) => {
  try {
    const newInfo = {
      ...req.body,
      user_id: req.params.id
    };

    const exists = await Posts.findOne({ where: newInfo });

    if (exists) {
      return res.sendStatus(409);
    }

    const newPost = await Posts.create(newInfo);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Export Router
module.exports = tradingRouter;
