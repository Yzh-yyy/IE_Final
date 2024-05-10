import { Link } from 'react-router-dom';

import family from "../assets/family.jpg";
import game from "../assets/game.png";
import play from "../assets/play.png";

export default function App() {


  return (
    <div>
      <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="text-5xl font-bold uppercase tracking-loose w-full">
              Does your kid know what's healthy?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              We can help you!
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Embark on a noble quest with your children to uncover the wonders
              of healthy eating and why it matters! 🛡️🍏
            </p>
            <Link to="/Info" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Want to learn more?
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src={family} alt="Family" />
          </div>
        </div>
      </div>
      <section className="bg-white border-b py-8s">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Welcome to Health Journey!
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Healthy eating habits in a more fun way! 🥕
              </h3>
              <p className="text-gray-600 mb-8">
                In a landscape dominated by sugary snacks and beverages,
                convincing children of the importance of nutrient-rich foods
                remains an uphill battle for many families. Luckily, we have
                just the thing to help you... GAMES!
                <br />
                <br />
                <Link
                  className="text-pink-500 underline"
                  to="/Info"
                >
                  Find out more
                </Link>
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img className="w-full md:w-4/5 z-50" src={play} alt="Play" />
            </div>
          </div>
          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <img className="w-full md:w-4/5 z-50" src={game} alt="Game" />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Playing Journey: The Healthy Quest 🗡️
                </h3>
                <p className="text-gray-600 mb-8">
                  Embark on an epic scrolling journey through a vibrant browser
                  world where every click is a step towards healthier choices!
                  🍎🥕 Along the way, your child will encounter a colorful array
                  of tempting treats, both nutritious and not-so-nutritious. But
                  fear not! With each encounter, they'll learn the invaluable
                  skill of distinguishing between the two, empowering them to
                  make informed decisions about what they eat.
                  <br />
                  <br />
                  <Link
                    className="text-pink-500 underline"
                    to="/Info"
                  >
                    Find out more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Browse our games 🎮
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <Link
                to="/Snake"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                  SNAKE
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Slither Quest 🐍
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Navigate the colorful world of fruits and veggies as a hungry
                  snake! Grow longer with each nutritious bite, but watch out
                  for the tempting treats that could shrink you down.
                </p>
              </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-start">
                <Link to="/Snake" className="mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  PLAY SNAKE
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <Link
                to="/FallingFood"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                  FALLING FOOD
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  NutriCatch: The Healthy Harvest 🕹️
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Dive into NutriCatch, where you snag healthy snacks for points
                  while dodging the bad stuff. Quick reflexes and nutrition
                  smarts make the game a tasty challenge for all ages!
                </p>
              </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-center">
                <Link to="/FallingFood" className="mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  PLAY FALLING FOOD
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <Link
                to="/"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                  NEXT GAME
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  PLACEHOLDER TITLE.
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Placeholder description
                </p>
              </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-end">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  PLAY PLACEHOLDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
