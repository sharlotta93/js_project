const GameLogic = require('./models/game_logic.js');


document.addEventListener('DOMContentLoaded', () => {
  const gameLogic = new GameLogic();
  console.log('Loaded');
  gameLogic.prepareQuestions();
})
