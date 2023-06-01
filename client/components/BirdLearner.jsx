import React, { useEffect, useState } from "react";
import axios from "axios";

const BirdLearner = ({ birdList, userId, listOfLearnedBirds }) => {
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
      .get(
        `https://xeno-canto.org/api/2/recordings?query=${birdCommonName.replace(
          /\s/g,
          "+"
        )}`
      )
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
      // uncomment line below for autoplay.
      // audioPlayer.play();
    }
  };

  const handleBirdChoice = (bird) => {
    console.log("chosenBird:", chosenBird);
    console.log("chosenBird.id:", chosenBird._id);
    const isCorrectBird =
      chosenBird && chosenBird.commonName === bird.commonName;
    alert(isCorrectBird ? "Correct bird!" : "Wrong bird!");

    // if correct bird button is clicked, set new choices, get new song, save learned bird to database(achievement).
    if (isCorrectBird) {
      const newRandomBirds = getBirds(birdList);
      setRandomBirds(newRandomBirds);

      const newChosenBird =
        newRandomBirds[Math.floor(Math.random() * newRandomBirds.length)];
      setChosenBird(newChosenBird);
      fetchBirdSong(newChosenBird.commonName);

      const learnedBirdData = {
        birdId: chosenBird._id,
        userId: userId,
        guessedAt: new Date().toISOString(), // timestamp
      };

      axios
        .post("/api/learnedBirds", learnedBirdData)
        .then((response) => {
          console.log("Learned bird added:", response.data);
        })
        .catch((error) => {
          console.error("Error adding learned bird:", error);
        });

      //comment out below line to have it autoplay the next bird. (wont stop until correct bird is guessed lol)
      audioPlayer.pause();
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
      
      <div>
      {audioPlayer && <button onClick={() => audioPlayer.play()}>PLAY!</button>}
      <br></br>
      {listOfLearnedBirds.length} / {birdList.length} Birds Learned

      </div>
    </div>
  );
};

export default BirdLearner;
