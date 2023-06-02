const express = require('express');
const router = express.Router();
require('dotenv').config();
const { saveStory } = require('../models/stories.js')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getStory = async (word) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Topic: ${word}. Add a Title followed by a colon, then write a horror story that is exactly two paragraphs:`,
    temperature: 0.8,
    max_tokens: 250,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  return response.data;
}

router.post('/id', async (req, res) => {
  const { title, story } = req.body;
  console.log(user.body);
  try {
    await saveStory(title, story);
    res.sendStatus(201);
  } catch (err) {
    console.error('Failed to SAVE story to DB at server:', err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  try {
    const story = await getStory(prompt);
    res.status(201).send(story);
  } catch (err) {
    console.error('Failed to POST prompt to API at server:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
