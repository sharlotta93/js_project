const GameLogic = require('./models/game_logic.js');
const GameView = require("./views/game.js");


document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.querySelector("#game-container");
  const gameView = new GameView(gameContainer);
  gameView.bindEvents();

  const gameLogic = new GameLogic();
  console.log('Loaded');
  gameLogic.prepareQuestion();
  gameLogic.bindEvents();
  gameLogic.dealWithAnswers();
})
