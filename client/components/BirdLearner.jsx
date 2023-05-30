import React, { useEffect, useState } from "react";

const BirdLearner = ({ birdList }) => {
  const [randomBirds, setRandomBirds] = useState([]);

  useEffect(() => {
    if (birdList.length > 0) {
      const birds = getBirds(birdList);
      setRandomBirds(birds);
    }
  }, [birdList]);

  const getBirds = (birdList) => {
    return [
      birdList[Math.floor(Math.random() * birdList.length)],
      birdList[Math.floor(Math.random() * birdList.length)],
      birdList[Math.floor(Math.random() * birdList.length)],
    ];
  };

  const handleBirdChoice = () => {
    // Handle bird choice logic here
  };

  return (
    <div>
      <h1> Which feathered virtuoso is behind this delightful serenade? </h1>
      {randomBirds.map((bird, index) => (
        <button key={index}>{bird.commonName}</button>
      ))}
    </div>
  );
};

export default BirdLearner;
