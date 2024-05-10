import React, { useState, useEffect } from "react";
import fries from "../assets/fries.png";
import apple from "../snake_assets/apple.png";
import astronaut from "../assets/astronaut.png";
import astronaut_icon from "../assets/astronaut_icon.png";
import astronaut_hurt from "../assets/astronaut_hurt.png";
import planet1 from "../assets/planet1.png";
import planet2 from "../assets/planet2.png";
import planet3 from "../assets/planet3.png";
import planet4 from "../assets/planet4.png";
import planet5 from "../assets/planet5.png";
import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";
import star3 from "../assets/star3.png";
import star4 from "../assets/star4.png";

export default function FallingFood() {
  const gridX = 30; // Size of the x grid
  const gridY = 20; // Size of the y grid
  const initialPlayer = { x: 10, y: gridY - 1 }; // Initial player position at the bottom
  const [player, setPlayer] = useState(initialPlayer);
  const [foods, setFoods] = useState([]);
  const [score, setScore] = useState(0);
  const [healthyFoodEaten, setHealthyFoodEaten] = useState(0);
  const [unhealthyFoodEaten, setUnhealthyFoodEaten] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fallInterval, setFallInterval] = useState(400); // Initial falling interval
  const [gameStarted, setGameStarted] = useState(false); // State to track game start

  // Predefined planet cells with their corresponding images
  const planetCells = [
    { x: 5, y: 5, image: planet1 },
    { x: 10, y: 7, image: planet2 },
    { x: 15, y: 5, image: planet3 },
    { x: 20, y: 5, image: planet4 },
    { x: 25, y: 3, image: planet5 }
  ];

  // Predefined star cells with their corresponding images
  const starCells = [
    { x: 0, y: 2, image: star1 }, { x: 4, y: 7, image: star2 }, { x: 8, y: 10, image: star3 }, { x: 12, y: 5, image: star4 }, { x: 16, y: 3, image: star1 }, { x: 20, y: 12, image: star2 }, { x: 24, y: 5, image: star3 }, { x: 28, y: 8, image: star4 }, { x: 3, y: 1, image: star1 }, { x: 7, y: 1, image: star2 }, { x: 11, y: 11, image: star3 }, { x: 15, y: 6, image: star4 }, { x: 19, y: 11, image: star1 }, { x: 23, y: 9, image: star2 }, { x: 27, y: 13, image: star3 }, { x: 2, y: 7, image: star4 }, { x: 6, y: 7, image: star1 }, { x: 10, y: 3, image: star2 }, { x: 14, y: 14, image: star3 }, { x: 18, y: 9, image: star4 }, { x: 22, y: 0, image: star1 }, { x: 26, y: 4, image: star2 }, { x: 1, y: 8, image: star3 }, { x: 5, y: 2, image: star4 }, { x: 9, y: 8, image: star1 }, { x: 13, y: 9, image: star2 }, { x: 17, y: 2, image: star3 }, { x: 21, y: 7, image: star4 }, { x: 25, y: 11, image: star1 }, { x: 29, y: 14, image: star2 }, { x: 5, y: 8, image: star1 }, { x: 0, y: 9, image: star2 }, { x: 7, y: 2, image: star3 }, { x: 8, y: 7, image: star4 }, { x: 3, y: 10, image: star1 }, { x: 2, y: 14, image: star2 },
  ];

  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridX),
      y: 0, // Start from the top
      type: Math.random() < 0.5 ? "green" : "red", // Randomly choose type
    };
  }

  function moveFoods() {
    setFoods((prevFoods) =>
      prevFoods.map((food) => ({
        ...food,
        y: food.y + 1,
      }))
    );
  }

  useEffect(() => {
    const spawnFoodInterval = setInterval(() => {
      if (!gameOver && Math.random() < 0.8) {
        setFoods((prevFoods) => [...prevFoods, generateFood()]);
      }
    }, 1000);

    const fallFoodInterval = setInterval(() => {
      if (!gameOver) {
        moveFoods();
      }
    }, fallInterval);

    return () => {
      clearInterval(spawnFoodInterval);
      clearInterval(fallFoodInterval);
    };
  }, [gameOver, fallInterval]);

  function handleKeyPress(event) {
    switch (event.key) {
      case "a":
        setPlayer((prevPlayer) =>
          prevPlayer.x > 0 ? { ...prevPlayer, x: prevPlayer.x - 1 } : prevPlayer
        );
        break;
      case "d":
        setPlayer((prevPlayer) =>
          prevPlayer.x < gridX - 1 ? { ...prevPlayer, x: prevPlayer.x + 1 } : prevPlayer
        );
        break;
      default:
        break;
    }
  }

  // Check for collisions and update score
  useEffect(() => {
    foods.forEach((food, index) => {
      if (player.x === food.x && player.y === food.y) {
        if (food.type === "green") {
          setScore((prevScore) => prevScore + 1);
        } else {
          setScore((prevScore) => prevScore - 1); // Allow scores to go into negatives
          setFallInterval((prevInterval) => Math.max(prevInterval - 25, 100)); // Increase falling speed
        }
        setFoods((prevFoods) => prevFoods.filter((_, i) => i !== index)); // Remove picked up food
      }
    });

    // Check for game over condition
    if (score < -5) {
      setGameOver(true);
    }
  }, [player, foods, score]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayer(initialPlayer);
    setFoods([]);
    setScore(0);
    setHealthyFoodEaten(0);
    setUnhealthyFoodEaten(0);
    setFallInterval(500);
    setGameOver(false);
  };



  function renderGrid() {
    const grid = [];
    for (let y = 0; y < gridY; y++) {
      const row = [];
      for (let x = 0; x < gridX; x++) {
        let cellStyle = {
          backgroundColor: "black",
        };

        // Check if the current cell is one of the planet cells
        const planetCell = planetCells.find((coord) => coord.x === x && coord.y === y);

        // Check if the current cell is one of the star cells
        const starCell = starCells.find((coord) => coord.x === x && coord.y === y);

        if (planetCell) {
          cellStyle.backgroundImage = `url(${planetCell.image})`;
          cellStyle.backgroundSize = "cover";
          cellStyle.backgroundPosition = "center";
        } else if (starCell) {
          cellStyle.backgroundImage = `url(${starCell.image})`;
          cellStyle.backgroundSize = "cover";
          cellStyle.backgroundPosition = "center";
        }

        const food = foods.find((f) => f.x === x && f.y === y);
        if (food) {
          if (food.type === "green") {
            row.push(
              <div key={`${x}-${y}`} className={`w-6 h-6`} style={{ ...cellStyle }}>
                <img src={apple} alt="Apple" className="w-full h-full" />
              </div>
            );
          } else {
            row.push(
              <div key={`${x}-${y}`} className={`w-6 h-6`} style={{ ...cellStyle }}>
                <img src={fries} alt="Fries" className="w-full h-full" />
              </div>
            );
          }
        } else if (player.x === x && player.y === y) {
          row.push(
            <div key={`${x}-${y}`} className={`w-6 h-6`} style={{ ...cellStyle }}>
              <img src={astronaut} alt="Astronaut" className="w-full h-full" />
            </div>
          );
        } else {
          row.push(
            <div key={`${x}-${y}`} className={`w-6 h-6`} style={{ ...cellStyle }} />
          );
        }
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  }

  return (
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {!gameStarted && !gameOver && (
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-6 text-5xl font-bold leading-tight">Falling Food</h1>
            <p className="leading-normal text-2xl mb-8">
              Embark on an exciting adventure with Cindy the Adventurous Astronaut! 🚀! Explore a galaxy brimming with tasty treats, but beware of the sneaky unhealthy snacks hiding among the stars!
            </p>
            <p className="leading-normal text-4xl mb-8">How to play:</p>
            <ul className="leading-normal text-xl mb-8 list-disc ml-6">
              <li><strong>A</strong> to move <strong>LEFT</strong></li>
              <li><strong>D</strong> to move <strong>RIGHT</strong></li>
              <li>Eating healthy food grants <strong>POINTS</strong>!</li>
              <li>Snacks lower your score and make the game <strong>harder</strong>! 😢</li>
            </ul>
            <button onClick={startGame} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Let's play!</button>
          </div>
        )}
        {!gameStarted && !gameOver && (
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full rounded-xl m-10 md:w-3/5 z-50" src={astronaut_icon} alt="Astronaut" />
          </div>
        )}
        {gameStarted && !gameOver && (
          <div className="grid grid-cols-20 gap-0 mx-auto pt-24">{renderGrid()}</div>
        )}
        {gameStarted && !gameOver && (
          <div className="w-full mx-auto md:w-3/5 py-6 text-center text-3xl">
            <div className="flex justify-between">
              <div className="mx-auto">
                <p className="inline-block">Score: {score}</p>
              </div>
              <div className="mx-auto">
                <p className="inline-block">Healthy Food: {healthyFoodEaten}</p>
              </div>
              <div className="mx-auto">
                <p className="inline-block">Unhealthy Food: {unhealthyFoodEaten}</p>
              </div>
              <div className="mx-auto">
                <p className="inline-block">Speed x {(1 + (400 - fallInterval) / 400).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-6 text-5xl font-bold leading-tight">Game Over!</h1>
            <p className="leading-normal text-2xl mb-8">
              Oops! Looks like you ate too much junk food! Don't worry, it happens to the best of us.
              <br />
              <br />
              How about giving it another try? Click 'Play Again' to start a fresh adventure with Cindy the Adventurous Astronaut! 🚀
            </p>
            <button onClick={resetGame} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Play again!</button>
          </div>
        )}
        {gameOver && (
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full rounded-xl m-10 md:w-3/5 z-50" src={astronaut_hurt} alt="Astronaut hurt" />
          </div>
        )}
      </div>
    </div>
  );
}
