const GameLogic = require('./models/game_logic.js');
const GameView = require("./views/game.js");
const Countries = require("./models/countries.js")
const PubSub = require('./helpers/pub_sub.js');


document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    PubSub.publish('Game:data-ready');
  });

  const gameContainer = document.querySelector("#game-container");
  const gameView = new GameView(gameContainer);
  gameView.bindEvents();

  const countries = new Countries();
  countries.getData();

  const gameLogic = new GameLogic();
  gameLogic.prepareQuestions();
  gameLogic.bindEvents();
  gameLogic.dealWithAnswers();
})
