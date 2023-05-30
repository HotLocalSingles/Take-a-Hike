const express = require('express');
const router = express.Router();
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getStory = async (word) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Topic: ${word}. Two-Sentence Horror Story:`,
    temperature: 0.8,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  return response.data;
}

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
