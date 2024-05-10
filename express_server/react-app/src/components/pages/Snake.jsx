import React, { useState, useEffect } from "react";

import apple from "../snake_assets/apple.png";
import body_bottomleft from "../snake_assets/body_bottomleft.png";
import body_bottomright from "../snake_assets/body_bottomright.png";
import body_horizontal from "../snake_assets/body_horizontal.png";
import body_topleft from "../snake_assets/body_topleft.png";
import body_topright from "../snake_assets/body_topright.png";
import body_vertical from "../snake_assets/body_vertical.png";
import head_down from "../snake_assets/head_down.png";
import head_left from "../snake_assets/head_left.png";
import head_right from "../snake_assets/head_right.png";
import head_up from "../snake_assets/head_up.png";
import tail_down from "../snake_assets/tail_down.png";
import tail_left from "../snake_assets/tail_left.png";
import tail_right from "../snake_assets/tail_right.png";
import tail_up from "../snake_assets/tail_up.png";
import snake_background from "../assets/snake_background.png";
import fries from "../assets/fries.png";
import snake_hurt from "../assets/snake_hurt.png";

export default function Snake() {
  const gridX = 30; // Size of the x grid
  const gridY = 20; // Size of the y grid
  const initialSnake = [
    { x: 4, y: 2 }, // Head
    { x: 3, y: 2 }, // Body part 1
    { x: 2, y: 2 }, // Body part 2
    { x: 1, y: 2 } // Body part 3
  ]; // Initial snake position
  const [snake, setSnake] = useState(initialSnake);
  const [healthyFood, setHealthyFood] = useState(generateFood());
  const [junkFood, setJunkFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(150);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [healthyFoodEaten, setHealthyFoodEaten] = useState(0);
  const [unhealthyFoodEaten, setUnhealthyFoodEaten] = useState(0);

  const startGame = () => {
    setGameStarted(true);
  };

  function generateFood() {
    const x = Math.floor(Math.random() * gridX);
    const y = Math.floor(Math.random() * gridY);
    return { x, y };
  }

  function isColliding(cell1, cell2) {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "a":
        if (direction !== "right") setDirection("left");
        break;
      case "d":
        if (direction !== "left") setDirection("right");
        break;
      case "w":
        if (direction !== "down") setDirection("up");
        break;
      case "s":
        if (direction !== "up") setDirection("down");
        break;
      default:
        break;
    }
  }

  function moveSnake() {
    if (gameOver) return;

    const newSnake = [...snake];
    let newHead = { ...newSnake[0] };

    switch (direction) {
      case "right":
        newHead.x++;
        break;
      case "left":
        newHead.x--;
        break;
      case "up":
        newHead.y--;
        break;
      case "down":
        newHead.y++;
        break;
      default:
        break;
    }

    if (
      newHead.x < 0 ||
      newHead.x >= gridX ||
      newHead.y < 0 ||
      newHead.y >= gridY
    ) {
      setGameOver(true);
      return;
    }

    for (let i = 1; i < newSnake.length; i++) {
      if (isColliding(newHead, newSnake[i])) {
        setGameOver(true);
        return;
      }
    }

    if (isColliding(newHead, healthyFood)) {
      setHealthyFood(generateFood());
      setScore(score + 1);
      setHealthyFoodEaten(healthyFoodEaten + 1);
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
    } else if (isColliding(newHead, junkFood)) {
      newSnake.pop(); // Remove last segment of the snake
      setJunkFood(generateFood());
      setScore(score - 1); // Decrease score when eating junk food
      setUnhealthyFoodEaten(unhealthyFoodEaten + 1);
      newSnake.pop();
    } else {
      newSnake.pop();
    }

    newSnake.unshift(newHead);
    setSnake(newSnake);
  }

  useEffect(() => {
    // Check if direction is set before allowing movement
    if (direction) {
      const intervalId = setInterval(moveSnake, speed);
      return () => clearInterval(intervalId);
    }
  }, [snake, direction, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function getNextCell(cell) {
    // Return the next cell based on the direction
    switch (direction) {
      case "right":
        return { x: cell.x + 1, y: cell.y };
      case "left":
        return { x: cell.x - 1, y: cell.y };
      case "up":
        return { x: cell.x, y: cell.y - 1 };
      case "down":
        return { x: cell.x, y: cell.y + 1 };
      default:
        return { x: cell.x + 1, y: cell.y };
    }
  }

  function getHeadImageSource(nextCell) {
    // Determine the appropriate head image based on the next cell position
    const dx = nextCell.x - snake[0].x;
    const dy = nextCell.y - snake[0].y;
    if (dx === 1) {
      return head_right;
    } else if (dx === -1) {
      return head_left;
    } else if (dy === -1) {
      return head_up;
    } else {
      return head_down;
    }
  }

  function renderGrid() {
    if (!gameStarted) return null;

    const grid = [];
    for (let y = 0; y < gridY; y++) {
      const row = [];
      for (let x = 0; x < gridX; x++) {
        let cellType = "";
        let imageSource = "";
        let backgroundColor = "";

        if (isColliding({ x, y }, snake[0])) {
          // Snake head
          const nextCell = getNextCell(snake[0]);
          imageSource = getHeadImageSource(nextCell);
        } else if (snake.some((cell) => isColliding(cell, { x, y }))) {
          // Snake body
          const bodyIndex = snake.findIndex((cell) => isColliding(cell, { x, y }));
          const currentCell = snake[bodyIndex];
          const nextCell = snake[bodyIndex - 1];
          const prevCell = snake[bodyIndex + 1];

          if (nextCell && prevCell) {
            // Body segment between two other segments
            if (nextCell.x === prevCell.x) {
              // Vertical segment
              imageSource = body_vertical;
            } else if (nextCell.y === prevCell.y) {
              // Horizontal segment
              imageSource = body_horizontal;
            } else if (nextCell.x === currentCell.x && nextCell.y === currentCell.y + 1 && prevCell.x == currentCell.x - 1) {
              // Top left corner
              imageSource = body_bottomleft;
            } else if (nextCell.x === currentCell.x && nextCell.y === currentCell.y + 1 && prevCell.x == currentCell.x + 1) {
              // Top right corner
              imageSource = body_bottomright;
            } else if (nextCell.x === currentCell.x && nextCell.y === currentCell.y - 1 && prevCell.x == currentCell.x - 1) {
              // Bottom left corner
              imageSource = body_topleft;
            } else if (nextCell.x === currentCell.x && nextCell.y === currentCell.y - 1 && prevCell.x == currentCell.x + 1) {
              // Bottom right corner
              imageSource = body_topright;
            } else if (nextCell.y === currentCell.y && nextCell.x === currentCell.x - 1 && prevCell.y == currentCell.y - 1) {
              // Top left corner
              imageSource = body_topleft;
            } else if (nextCell.y === currentCell.y && nextCell.x === currentCell.x - 1 && prevCell.y == currentCell.y + 1) {
              // Bottom left corner
              imageSource = body_bottomleft;
            } else if (nextCell.y === currentCell.y && nextCell.x === currentCell.x + 1 && prevCell.y == currentCell.y - 1) {
              // Top right corner
              imageSource = body_topright;
            } else if (nextCell.y === currentCell.y && nextCell.x === currentCell.x + 1 && prevCell.y == currentCell.y + 1) {
              // Bottom right corner
              imageSource = body_bottomright;
            }
          } else if (nextCell) {
            // Tail segment
            if (nextCell.x === currentCell.x + 1) {
              // Tail pointing right
              imageSource = tail_left;
            } else if (nextCell.x === currentCell.x - 1) {
              // Tail pointing left
              imageSource = tail_right;
            } else if (nextCell.y === currentCell.y - 1) {
              // Tail pointing up
              imageSource = tail_down;
            } else if (nextCell.y === currentCell.y + 1) {
              // Tail pointing down
              imageSource = tail_up;
            }
          }
        } else if (isColliding({ x, y }, healthyFood)) {
          // Apple
          imageSource = apple;
        } else if (isColliding({ x, y }, junkFood)) {
          //  Junk food
          imageSource = fries;
        }
        // Checkered green background for empty cells
        if ((x + y) % 2 === 0) {
          backgroundColor = "#8BC34A"; // Lighter green
        } else {
          backgroundColor = "#689F38"; // Darker green
        }


        row.push(
          <div
            key={`${x}-${y}`}
            className="w-6 h-6"
            style={{
              backgroundImage: `url(${imageSource})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: backgroundColor,
            }}
          />
        );
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  }

  const resetGame = () => {
    setSnake(initialSnake);
    setHealthyFood(generateFood());
    setJunkFood(generateFood());
    setScore(0);
    setDirection(false);
    setGameOver(false);
    setSpeed(150);
    setHealthyFoodEaten(0);
    setUnhealthyFoodEaten(0);
    setGameStarted(true);
  };

  return (
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {!gameStarted && !gameOver && (
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-6 text-5xl font-bold leading-tight">SNAKE</h1>
            <p className="leading-normal text-2xl mb-8">
              Embark on an exciting adventure with Slinky, the friendly snake! Explore a world filled with tasty treats, but watch out for those sneaky unhealthy snacks hiding among them.
            </p>
            <p className="leading-normal text-4xl mb-8">How to play:</p>
            <ul className="leading-normal text-xl mb-8 list-disc ml-6">
              <li><strong>A</strong> to move <strong>LEFT</strong></li>
              <li><strong>W</strong> to move <strong>UP</strong></li>
              <li><strong>S</strong> to move <strong>DOWN</strong></li>
              <li><strong>D</strong> to move <strong>RIGHT</strong></li>
              <li>Eating healthy food <strong>GROWS</strong> the Snake! 🍎</li>
              <li>Eating unhealthy food <strong>SHRINKS</strong> the Snake 😢</li>
            </ul>
            <button onClick={startGame} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Let's play!</button>
          </div>
        )}
        {!gameStarted && !gameOver && (
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full rounded-xl m-10 md:w-3/5 z-50" src={snake_background} alt="Snake" />
          </div>
        )}
        {gameStarted && !gameOver && (
          <div className="grid grid-cols-20 gap-0 mx-auto pt-24">{renderGrid()}</div>
        )}
        {gameStarted && !gameOver && (
          <div className="w-full mx-auto md:w-3/5 py-6 text-center text-3xl">
            <div className="flex justify-between">
              <div className="mr-6">
                <p className="inline-block">Score: {score}</p>
              </div>
              <div className="mx-auto">
                <p className="inline-block">Healthy Food Eaten: {healthyFoodEaten}</p>
              </div>
              <div className="ml-6">
                <p className="inline-block">Unhealthy Food Eaten: {unhealthyFoodEaten}</p>
              </div>
            </div>
          </div>
        )}
        {gameOver && (

          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-6 text-5xl font-bold leading-tight">Game Over!</h1>
            <p className="leading-normal text-2xl mb-8">
              Oops! Looks like you got caught! Don't worry, it happens to the best of us.
              How about giving it another try? Click 'Play Again' to start a fresh adventure with Slinky the Snake! 🐍
            </p>
            <button onClick={resetGame} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Play again!</button>
          </div>
        )}
        {gameOver && (
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full rounded-xl m-10 md:w-3/5 z-50" src={snake_hurt} alt="Snake hurt" />
          </div>
        )}
      </div>
    </div>
  );
}
