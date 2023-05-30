import React, { useState, useEffect } from "react";
import axios from "axios";

const Story = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState([]);

  const handleInput = (e) => {
    const { value } = e.target;
    console.log(value);
    setPrompt(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { prompt });
      const story = response.data.choices[0].text;
      setStory(story.split('\n'));
    } catch (err) {
      console.error('Failed to POST story to API at client:', err);
    }
  }

  return (
    <div>
      <input onChange={handleInput}></input>
      <button onClick={handleSubmit}>Submit Prompt</button>
      {story.map((paragraph, i) => <p key={i}>{ paragraph }</p>)}
    </div>
  );
}

export default Story;
