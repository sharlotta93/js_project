const GameLogic = require('./models/game_logic.js');


document.addEventListener('DOMContentLoaded', () => {
  const gameLogic = new GameLogic();
  gameLogic.prepareQuestions();
  gameLogic.initialLoad()
})
