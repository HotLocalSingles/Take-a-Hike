import React, { useEffect, useState } from "react";
import axios from "axios";

const BirdLearner = ({ birdList }) => {
  const [randomBirds, setRandomBirds] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [chosenBird, setChosenBird] = useState(null);

  useEffect(() => {
    if (birdList.length > 0) {
      const birds = getBirds(birdList);
      setRandomBirds(birds);

      if (birds.length > 0) {
        const chosen = birds[Math.floor(Math.random() * birds.length)];
        setChosenBird(chosen);
        fetchBirdSong(chosen.commonName);
      }
    }
  }, [birdList]);
  

  // gets 3 random birds
  const getBirds = (birdList) => {
    return [
      birdList[Math.floor(Math.random() * birdList.length)],
      birdList[Math.floor(Math.random() * birdList.length)],
      birdList[Math.floor(Math.random() * birdList.length)],
    ];
  };

  // gets bird audio
  const fetchBirdSong = (birdCommonName) => {
    axios
      .get(`https://xeno-canto.org/api/2/recordings?query=${birdCommonName.replace(/\s/g, "+")}`)
      .then((response) => {
        const recordings = response.data.recordings;
        if (recordings.length > 0) {
          const audioUrl = recordings[0].file;
          playAudio(audioUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching bird song:", error);
      });
  };

  const playAudio = (audioUrl) => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    }
  };

  const handleBirdChoice = (bird) => {
    const isCorrectBird = chosenBird && chosenBird.commonName === bird.commonName;
    alert(isCorrectBird ? "Correct bird!" : "Wrong bird!");

    if (isCorrectBird) {
      const newRandomBirds = getBirds(birdList);
      setRandomBirds(newRandomBirds);

      const newChosenBird = newRandomBirds[Math.floor(Math.random() * newRandomBirds.length)];
      setChosenBird(newChosenBird);
      fetchBirdSong(newChosenBird.commonName);
      // audioPlayer.pause();
    }
  };

  return (
    <div>
      <audio ref={(ref) => setAudioPlayer(ref)} />
      <h1>Which feathered virtuoso is behind this delightful serenade?</h1>
      {randomBirds.map((bird, index) => (
        <button key={index} onClick={() => handleBirdChoice(bird)}>
          {bird.commonName}
        </button>
      ))}
      {audioPlayer && (
        <button onClick={() => audioPlayer.play()}>
          PLAY!
        </button>
      )}
    </div>
  );
};

export default BirdLearner;
