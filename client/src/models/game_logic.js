const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const GameLogic = function () {
  this.questions = [];
  this.request = new RequestHelper('http://localhost:3000/api/game');
}

GameLogic.prototype.prepareQuestions = function () {
  this.request.get()
    //get all questions from database
    .then((questions) => {
      this.questions = questions;
      this.initialLoad(questions);
      //assign data received to the array
    })
    .catch((err) => console.error(err));
};
GameLogic.prototype.initialLoad = (questions) => {
  const startButton = document.querySelector('#start-game');
  console.log(questions);
  startButton.addEventListener('click', this.onStartButtonClick);

};

GameLogic.prototype.onStartButtonClick = () => {
    startButton.classList.add('hidden');
    PubSub.publish('Game:initial-question', this.questions[0])

};


module.exports = GameLogic;
