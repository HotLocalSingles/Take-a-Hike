import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bulma/css/bulma.min.css';

const Story = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState([]);
  const [editedStory, setEditedStory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);

  const getUserObj = () => {
    axios.get("/user").then((response) => {
      const user = response.data;
      console.log(user);
      setUser(user);
    })
    .catch((err) => {
      console.error("Could not GET user at client", err);
      // navigate('/login');
    })
  }

  useEffect (() => {
    getUserObj();
  }, [])

  const handleInput = (e) => {
    const { value } = e.target;
    setPrompt(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { prompt });
      const story = response.data.choices[0].text;
      setTitle(story.split(':')[0].trim());
      const paragraphs = story.split(':')[1].split('\n');
      setStory(paragraphs);
      setEditedStory(paragraphs);
    } catch (err) {
      console.error('Failed to POST story to API at client:', err);
    }
  }

  const handleEditToggle = () => {
    setIsEditing(prevState => !prevState);
    setStory(editedStory);
    setTitle(title);
  }

  const handleSaveToggle = () => {
    setIsEditing(prevState => !prevState);
    setStory(editedStory);
    setTitle(title);
    saveStory();
  }

  const saveStory = async () => {
    try {
      await axios.post(`/api/stories/${user._id}`, {story, title});
    } catch (err) {
      console.error('Failed to SAVE story to DB at client:', err)
    }
  }

  const handleEdit = (e) => {
    const { value } = e.target;
    setEditedStory(value.split('\n'));
  }

  return (
    <div>
      <input onChange={handleInput} />
      <button onClick={handleSubmit}>Submit Prompt</button>
      <p align="center">{title}</p>
      {isEditing ? (
        <div>
          <textarea
          value={editedStory.join('\n')}
          onChange={handleEdit}
          rows={10}
          cols={100}
          />
          <button onClick={handleSaveToggle}>Save</button>
        </div>
      ) : (
        <div>
          {story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Story;
